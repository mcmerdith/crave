import { UserPreferences } from "@crave/api";
import {
  createUserWithEmailAndPassword,
  EmailAuthProvider,
  linkWithCredential,
  onAuthStateChanged,
  signInAnonymously,
  signInWithEmailAndPassword,
  signOut,
  updateProfile,
  UserCredential,
  type User,
} from "@firebase/auth";
import { doc } from "@firebase/firestore";
import { useCallback, useEffect, useState } from "react";
import { auth } from "../firebase";
import { useDocument } from "../hooks/firebase";
import { users } from "./collections";

export type LoginOptions = {
  credential: "emailAndPassword";
  email: string;
  password: string;
};

export type SignUpOptions = LoginOptions & {
  displayName?: string;
  photoUrl?: string;
};

export type RichUserObject = User & {
  preferences: UserPreferences | null | undefined;
};

export type CredentialManager = {
  currentUser: RichUserObject | null;
  signIn(options: LoginOptions): Promise<void>;
  signUp(options: SignUpOptions): Promise<void>;
  signOut(): Promise<void>;
};

export function useCredentialManager(
  user: RichUserObject | null,
): CredentialManager {
  const linkIfAnonymous = useCallback(
    async (options: LoginOptions): Promise<UserCredential | null> => {
      if (!user) {
        console.warn(
          "Attempted to link without an anonymous user (this should never happen)",
          options,
        );
        return null;
      }
      if (!user.isAnonymous) {
        console.error(
          `Attempted to link against existing user ${user.uid} (${user.displayName ?? "No name"})`,
          options,
        );
        throw new Error("You are already signed in!");
      }
      console.debug(`Linking to anonymous user ${user.uid}`, options);
      switch (options.credential) {
        case "emailAndPassword":
          return await linkWithCredential(
            user,
            EmailAuthProvider.credential(options.email, options.password),
          );
      }
    },
    [user],
  );
  return {
    currentUser: user,
    signIn: useCallback(
      async (options: LoginOptions) => {
        try {
          if (await linkIfAnonymous(options)) return;
          switch (options.credential) {
            case "emailAndPassword":
              await signInWithEmailAndPassword(
                auth,
                options.email,
                options.password,
              );
              break;
          }
        } catch (e) {
          console.error("Failed to sign in!", e);
          throw new Error(
            Error.isError(e)
              ? e.message
              : "Something went wrong while signing in",
            { cause: e },
          );
        }
      },
      [linkIfAnonymous],
    ),
    signUp: useCallback(
      async (options: SignUpOptions) => {
        try {
          let newUser: UserCredential | null = await linkIfAnonymous(options);
          if (newUser == null) {
            switch (options.credential) {
              case "emailAndPassword":
                newUser = await createUserWithEmailAndPassword(
                  auth,
                  options.email,
                  options.password,
                );
                break;
            }
          }
          await updateProfile(newUser.user, {
            displayName: options.displayName,
            photoURL: options.photoUrl,
          });
        } catch (e) {
          console.error("Failed to sign up!", e);
          throw new Error(
            Error.isError(e)
              ? e.message
              : "Something went wrong while signing up",
            { cause: e },
          );
        }
      },
      [linkIfAnonymous],
    ),
    signOut: useCallback(async () => {
      try {
        await signOut(auth);
      } catch (e) {
        console.error("Failed to sign out!", e);
        throw new Error(
          Error.isError(e)
            ? e.message
            : "Something went wrong while signing out",
          { cause: e },
        );
      }
    }, []),
  };
}

/**
 * Do not call this method directly.
 * Prefer the `currentUser` property of `useUserContext`
 *
 * @returns The currently logged in user
 */
export function useCurrentUser(): RichUserObject | null {
  const [user, setUser] = useState<User | null>(null);
  const preferences = useUserPreferences(user?.uid);

  console.debug(
    user?.isAnonymous ? "Anonymous" : (user?.displayName ?? "User"),
    "is the current user",
  );

  useEffect(() => {
    return onAuthStateChanged(auth, (newUser) => {
      if (!newUser) {
        // create anonymous login
        signInAnonymously(auth);
      }
      setUser(newUser);
    });
  }, []);

  return (
    user && {
      ...user,
      preferences: preferences.data,
    }
  );
}

export function useUserPreferences(userId?: string) {
  return useDocument(
    doc(users, userId ?? "default"),
    userId
      ? {
          userId: userId,
          dietary: {
            vegetarian: false,
            vegan: false,
            glutenFree: false,
          },
          recentMatchIds: [],
        }
      : undefined,
  );
}
