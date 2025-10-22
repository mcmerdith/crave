import { initializeApp } from "firebase/app";
import { getFirestore } from "@firebase/firestore";
import { getAuth } from "@firebase/auth";

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
const auth = getAuth(app);

export { firestore, auth };
