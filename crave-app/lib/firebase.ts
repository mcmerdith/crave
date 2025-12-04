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
} catch (e) {
  console.warn(
    "React native persistence is not available. Falling back to local storage",
    e,
  );
  persistence = browserSessionPersistence;
}
const auth = initializeAuth(app, {
  persistence: persistence,
});

export { firestore, auth };
