import { initializeApp } from "firebase-admin/app";
import { getAuth } from "firebase-admin/auth";

const firebaseConfig = {
  apiKey: "AIzaSyB5Pw5gesDm8KUYqdyhHQpttsjhhfRRJ48",
  authDomain: "crave-ea79a.firebaseapp.com",
  projectId: "crave-ea79a",
  storageBucket: "crave-ea79a.firebasestorage.app",
  messagingSenderId: "474661992902",
  appId: "1:474661992902:web:5b0705cedb794f4d169ac7",
  measurementId: "G-5D450Y46M8"
};

console.log("Initializing Firebase")

export const firebaseApp = initializeApp(firebaseConfig);
export const firebaseAuth = getAuth();
