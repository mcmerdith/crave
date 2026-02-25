import { collection } from "firebase/firestore";
import { firestore } from "../firebase";

export const users = collection(firestore, "users");
export const restaurants = collection(firestore, "restaurants");
export const lobbies = collection(firestore, "lobbies");
