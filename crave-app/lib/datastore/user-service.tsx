import { onAuthStateChanged, type User } from "@firebase/auth";
import { doc } from "@firebase/firestore";
import { useEffect, useState } from "react";
import { auth } from "../firebase";
import { useDocument } from "../hooks/firebase";
import { users } from "./collections";

// TODO
export function useCurrentUser() {
  const [user, setUser] = useState<User | null>(null);
  const preferences = useUserPreferences(user?.uid);

  useEffect(() => {
    return onAuthStateChanged(auth, (newUser) => {
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
