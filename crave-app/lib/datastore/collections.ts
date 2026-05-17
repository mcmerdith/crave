import { GroupLobby, GroupLobbyMember, UserPreferences } from "@crave/api";
import {
  collection,
  collectionGroup,
  CollectionReference,
  Query,
} from "@firebase/firestore";
import { firestore } from "../firebase";

export const users = collection(firestore, "users") as CollectionReference<
  UserPreferences,
  UserPreferences
>;
export const restaurants = collection(firestore, "restaurants");
export const lobbies = collection(firestore, "lobbies") as CollectionReference<
  GroupLobby,
  GroupLobby
>;
export const lobbyMembers = collectionGroup(
  firestore,
  "members",
) as Query<GroupLobbyMember>;
