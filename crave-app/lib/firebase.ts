import { initializeApp } from "@firebase/app";
import { getFirestore } from "@firebase/firestore";
import {
  browserSessionPersistence,
  // @ts-expect-error getReactNativePersistence is not exported from @firebase/auth
  getReactNativePersistence,
  initializeAuth,
  Persistence,
} from "@firebase/auth";
import ReactNativeAsyncStorage from "@react-native-async-storage/async-storage";

const firebaseConfig = {
  apiKey: "AIzaSyB5Pw5gesDm8KUYqdyhHQpttsjhhfRRJ48",
  authDomain: "crave-ea79a.firebaseapp.com",
  projectId: "crave-ea79a",
  storageBucket: "crave-ea79a.firebasestorage.app",
  messagingSenderId: "474661992902",
  appId: "1:474661992902:web:7bc39e32f1251d7d169ac7",
  measurementId: "G-FG8NEZ5HMF",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const firestore = getFirestore(app);
let persistence: Persistence;
try {
  persistence = getReactNativePersistence(ReactNativeAsyncStorage);
} catch {
  console.warn(
    "React native persistence is not available. Falling back to local storage",
  );
  persistence = browserSessionPersistence;
}
const auth = initializeAuth(app, {
  persistence: persistence,
});

export { firestore, auth };

export function getFirebaseErrorMessage(e: unknown): string {
  if (Error.isError(e)) {
    if (!("code" in e)) return e.message;
    switch (e.code) {
      case "auth/invalid-email":
        return "Invalid email address";
      case "auth/user-disabled":
        return "Your user account is currently disabled";
      case "auth/user-not-found":
        return "User does not exist";
      case "auth/wrong-password":
        return "Invalid password";
      case "auth/invalid-credential":
        return "Incorrect login information";
      case "auth/credential-already-in-use":
        return "The credential is already in use";
      case "auth/email-already-in-use":
        return "The email is already in use";
      case "auth/weak-password":
        return "Your password must be at least 6 characters";
    }
    return `An unknown error occurred (${e.code}): ${e.message}`;
  } else {
    return `Something went wrong: ${e}`;
  }
}
