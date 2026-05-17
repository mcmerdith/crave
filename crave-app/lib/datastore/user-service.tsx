import { UserPreferences } from "@crave/api";
import {
  createUserWithEmailAndPassword,
  EmailAuthProvider,
  linkWithCredential,
  onAuthStateChanged,
  signInAnonymously,
  signInWithEmailAndPassword,
  signOut,
  updateCurrentUser,
  updateProfile,
  UserCredential,
  type User,
} from "@firebase/auth";
import { doc } from "@firebase/firestore";
import { useCallback, useEffect, useState } from "react";
import { auth, getFirebaseErrorMessage } from "../firebase";
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

export type UserWithPreferences = {
  user: User | null;
  preferences: UserPreferences | null | undefined;
};

export type SessionChangeResult =
  | {
      success: true;
      errorMessage?: undefined;
    }
  | {
      success: false;
      errorMessage: string;
    };

export type SessionManager = {
  signIn(options: LoginOptions): Promise<SessionChangeResult>;
  signUp(options: SignUpOptions): Promise<SessionChangeResult>;
  signOut(): Promise<SessionChangeResult>;
};

export function useSessionManager(): SessionManager {
  const linkIfAnonymous = useCallback(
    async (options: LoginOptions): Promise<UserCredential | null> => {
      const user = auth.currentUser;
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
    [],
  );
  return {
    signIn: useCallback(
      async (options: LoginOptions): Promise<SessionChangeResult> => {
        try {
          // this doesn't work. can't link existing user accounts to anonymous accounts
          // if (await linkIfAnonymous(options)) return;
          switch (options.credential) {
            case "emailAndPassword":
              await signInWithEmailAndPassword(
                auth,
                options.email,
                options.password,
              );
              break;
          }
          return {
            success: true,
          };
        } catch (e) {
          console.error("Failed to sign in!", e);
          return {
            success: false,
            errorMessage: getFirebaseErrorMessage(e),
          };
        }
      },
      [],
    ),
    signUp: useCallback(
      async (options: SignUpOptions): Promise<SessionChangeResult> => {
        try {
          let credential: UserCredential | null =
            await linkIfAnonymous(options);
          if (credential == null) {
            switch (options.credential) {
              case "emailAndPassword":
                credential = await createUserWithEmailAndPassword(
                  auth,
                  options.email,
                  options.password,
                );
                break;
            }
          } else {
            await updateCurrentUser(auth, credential.user);
          }
          await updateProfile(credential.user, {
            displayName: options.displayName,
            photoURL: options.photoUrl,
          });
          return { success: true };
        } catch (e) {
          console.error("Failed to sign up!", e);
          return {
            success: false,
            errorMessage: getFirebaseErrorMessage(e),
          };
        }
      },
      [linkIfAnonymous],
    ),
    signOut: useCallback(async (): Promise<SessionChangeResult> => {
      try {
        await signOut(auth);
        return { success: true };
      } catch (e) {
        console.error("Failed to sign out!", e);
        return {
          success: false,
          errorMessage: getFirebaseErrorMessage(e),
        };
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
export function useLoggedInUser(): UserWithPreferences {
  const [user, setUser] = useState<User | null>(auth.currentUser);
  const preferences = useUserPreferences(user?.uid);

  useEffect(() => {
    return onAuthStateChanged(auth, (newUser) => {
      console.debug(
        "[auth] user changed:",
        newUser
          ? `${
              newUser.isAnonymous
                ? "Anonymous"
                : (newUser.displayName ?? "User")
            } (${newUser?.uid})`
          : undefined,
      );
      if (!newUser) {
        // create anonymous login
        signInAnonymously(auth).then((credential) => {
          console.debug(`[auth] created anonymous user ${credential.user.uid}`);
        });
      }
      setUser(newUser);
    });
  }, []);

  return {
    user: user,
    preferences: preferences.data,
  };
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
