import { getDocs, where } from "@firebase/firestore";
import { useMutation } from "@tanstack/react-query";
import { useState } from "react";
import { useUserContext } from "../context";
import { lobbyMembers } from "../datastore/collections";
import {
  CreateLobbyId,
  LobbyDocRef,
  LobbyMembersColRef,
  LobbyMembersDocRef,
} from "../datastore/group-mode";
import { trpc } from "../trpc";
import { useCollectionRealtime, useDocumentRealtime } from "./firebase";

/**
 * Create or join a group lobby.
 * If no lobbyId is provided, creates a new lobby and adds the current user as the owner.
 * If a lobbyId is provided, joins the existing lobby with that ID, or returns null if the lobby does not exist.
 */
export const useGroupLobby = (
  requestLobbyId?: string,
  create: boolean = false,
) => {
  const { user } = useUserContext();
  const [lobbyId] = useState(requestLobbyId ?? CreateLobbyId());
  const [deleted, setDeleted] = useState(false);

  const lobby = useDocumentRealtime(
    user ? LobbyDocRef(lobbyId) : null,
    create
      ? (ref) => ({
          id: ref.id,
          ownerId: user?.uid ?? "",
          status: "open" as const,
        })
      : undefined,
  );

  const self = useDocumentRealtime(
    user ? LobbyMembersDocRef(lobbyId, user.uid) : null,
    deleted
      ? undefined
      : () => ({
          userId: user?.uid ?? "",
          name: user?.displayName ?? "Anonymous",
          complete: false,
          likeIds: [],
          dislikeIds: [],
        }),
  );

  const members = useCollectionRealtime(LobbyMembersColRef(lobbyId));
  const deleteLobby = useMutation(
    trpc.groupLobby.deleteLobby.mutationOptions(),
  );

  if (lobby.data === undefined || members === undefined) return undefined;
  if (lobby.data === null) return null;

  return {
    ...lobby.data,
    members: members,
    self: self,
    handle: lobby,
    async delete() {
      setDeleted(true);
      await deleteLobby.mutateAsync({ lobbyId });
    },
  };
};

export type LobbyInfo = { lobbyId: string; memberCount: number };

export const useUserLobbies = (): LobbyInfo[] | undefined => {
  const { user } = useUserContext();

  // const cb = useCallback(, []);

  const lobbyCol = useCollectionRealtime(
    user ? lobbyMembers : null,
    user ? [where("userId", "==", user.uid)] : undefined,
    async (doc) => {
      const lobbyId = doc.ref.parent.parent!.id;
      const memberCount = (await getDocs(doc.ref.parent)).size;
      return { lobbyId, memberCount: memberCount };
    },
  );

  // const res = use(Promise.all(lobbyInfo));

  return lobbyCol?.filter((l) => l !== undefined);
};
