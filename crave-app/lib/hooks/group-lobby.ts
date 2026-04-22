import { GroupLobby, UserId } from "@crave/api";
import {
  CreateLobbyId,
  LobbyDocRef,
  LobbyMembersColRef,
  LobbyMembersDocRef,
} from "../datastore/group-mode";
import { useCurrentUser } from "../datastore/user-service";
import {
  useCollectionRealtime,
  useDocument,
  useDocumentRealtime,
} from "./firebase";
import { useState } from "react";

/**
 * Create or join a group lobby.
 * If no lobbyId is provided, creates a new lobby and adds the current user as the owner.
 * If a lobbyId is provided, joins the existing lobby with that ID, or returns null if the lobby does not exist.
 */
export const useGroupLobby = (requestLobbyId?: string) => {
  const user = useCurrentUser();
  const [lobbyId, _] = useState(requestLobbyId ?? CreateLobbyId());

  const lobby = useDocumentRealtime(
    LobbyDocRef(lobbyId),
    requestLobbyId
      ? undefined
      : (ref) => ({
          id: ref.id,
          ownerId: user!.uid,
          status: "open" as const,
        }),
  );

  useDocument(LobbyMembersDocRef(lobbyId, user!.uid), {
    userId: user!.uid,
    name: user!.displayName ?? "Anonymous",
    complete: false,
    likeIds: [],
    dislikeIds: [],
  });

  const members = useCollectionRealtime(LobbyMembersColRef(lobbyId));

  if (lobby.data === undefined || members === undefined) return undefined;

  return {
    lobby: lobby.data,
    members: members,
  };
};
