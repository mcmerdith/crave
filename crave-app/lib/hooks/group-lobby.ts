import { CreateLobbyId, LobbyDocRef } from "../datastore/group-mode";
import { useDocumentRealtime } from "./firebase";

export const useGroupLobby = (lobbyId?: string) => {
  return useDocumentRealtime(
    LobbyDocRef(lobbyId ?? CreateLobbyId()),
    (ref) => ({
      id: ref.id,
      members: [],
      ownerId: "test-user",
      status: "open" as const,
    }),
  );
};
