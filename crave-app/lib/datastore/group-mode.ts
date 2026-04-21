import { doc, DocumentReference } from "@firebase/firestore";
import { lobbies } from "./collections";
import { GroupLobby, GroupLobbyMember } from "@crave/api";

export const LobbyDocRef = (id: string) =>
  doc(lobbies, id) as DocumentReference<GroupLobby, GroupLobby>;
export const LobbyMembersDocRef = (id: string, memberid: string) =>
  doc(lobbies, id, "members", memberid) as DocumentReference<
    GroupLobbyMember,
    GroupLobbyMember
  >;

/**
 * @returns A "unique" 6 digit code
 * @deprecated This is bad - will not be necessary when the backend handles creating lobbies
 */
export const CreateLobbyId = () => {
  // possible reduced character set?
  const chars = "ETANSHRDCU0123456789";
  // 50-50 numbers/letters
  // const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789012345678913579";
  let result = "";
  for (let i = 0; i < 6; i++) {
    result += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  return result;
};
