import { collection, CollectionReference } from "@firebase/firestore";
import { firestore } from "../firebase";
import { UserPreferences } from "@crave/api";

export const users = collection(firestore, "users") as CollectionReference<
  UserPreferences,
  UserPreferences
>;
export const restaurants = collection(firestore, "restaurants");
export const lobbies = collection(firestore, "lobbies");
