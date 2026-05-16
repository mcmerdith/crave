import { useState } from "react";
import { useUserContext } from "../context";
import {
  CreateLobbyId,
  LobbyDocRef,
  LobbyMembersColRef,
  LobbyMembersDocRef,
} from "../datastore/group-mode";
import {
  useCollectionRealtime,
  useDocument,
  useDocumentRealtime,
} from "./firebase";

/**
 * Create or join a group lobby.
 * If no lobbyId is provided, creates a new lobby and adds the current user as the owner.
 * If a lobbyId is provided, joins the existing lobby with that ID, or returns null if the lobby does not exist.
 */
export const useGroupLobby = (requestLobbyId?: string) => {
  const { currentUser: user } = useUserContext();
  const [lobbyId] = useState(requestLobbyId ?? CreateLobbyId());

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

  const existingMember = useDocumentRealtime(
    LobbyMembersDocRef(lobbyId, user!.uid),
  );

  useDocument(
    LobbyMembersDocRef(lobbyId, user!.uid),
    existingMember.data === null
      ? {
          userId: user!.uid,
          name: user!.displayName ?? "Anonymous",
          complete: false,
          likeIds: [],
          dislikeIds: [],
        }
      : undefined,
  );

  const members = useCollectionRealtime(LobbyMembersColRef(lobbyId));

  if (lobby.data === undefined || members === undefined) return undefined;
  if (lobby.data === null) return null;

  return {
    ...lobby.data,
    members: members,
  };
};
