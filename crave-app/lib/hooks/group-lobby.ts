import { GroupLobby } from "@crave/api";
import { CreateLobbyId, LobbyDocRef } from "../datastore/group-mode";
import { useCurrentUser } from "../datastore/user-service";
import { arrayUnion, useDocumentRealtime } from "./firebase";

/**
 * Create or join a group lobby.
 * If no lobbyId is provided, creates a new lobby and adds the current user as the owner.
 * If a lobbyId is provided, joins the existing lobby with that ID, or returns null if the lobby does not exist.
 */
export const useGroupLobby = (
  lobbyId?: string,
): GroupLobby | undefined | null => {
  const user = useCurrentUser();
  const lobby = useDocumentRealtime(
    LobbyDocRef(lobbyId ?? CreateLobbyId()),
    lobbyId
      ? undefined
      : (ref) => ({
          id: ref.id,
          members: [{ id: user!.uid, name: user!.displayName ?? "Anonymous" }],
          ownerId: user!.uid,
          status: "open" as const,
        }),
  );
  if (lobby.data == null) return null;
  if (!lobby.data.members.some((m) => m.id === user!.uid)) {
    lobby.update({
      members: arrayUnion({
        id: user!.uid,
        name: user!.displayName ?? "Anonymous",
      }),
    });
    return undefined;
  } else {
    return lobby.data;
  }
};
