import { DocumentReference, getDoc, getDocs, where } from "@firebase/firestore";
import { useMutation } from "@tanstack/react-query";
import { useState } from "react";
import { useUserContext } from "../context";
import { lobbyMembers } from "../datastore/collections";
import {
  LobbyDocRef,
  LobbyMembersColRef,
  LobbyMembersDocRef,
} from "../datastore/group-mode";
import { trpc } from "../trpc";
import { useCollectionRealtime, useDocumentRealtime } from "./firebase";
import { GroupLobby } from "@crave/api";

/**
 * Create or join a group lobby.
 *
 * If the lobby does not exist, it will be created if the `create` parameter is true.
 *
 * @returns `undefined` if a lobby ID of `null` is provided, or a lobby (if one exists, or `create` is provided), or undefined
 */
export const useGroupLobby = (
  lobbyId: string | null,
  create: boolean = false,
) => {
  const { user } = useUserContext();
  const [deleted, setDeleted] = useState(false);

  const lobby = useDocumentRealtime(
    user && lobbyId ? LobbyDocRef(lobbyId) : null,
    create
      ? (ref) => ({
          id: ref.id,
          ownerId: user?.uid ?? "",
          status: "open" as const,
          bestMatchId: null,
        })
      : undefined,
  );

  const self = useDocumentRealtime(
    user && lobbyId && !!lobby.data
      ? LobbyMembersDocRef(lobbyId, user.uid)
      : null,
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

  const members = useCollectionRealtime(
    lobbyId ? LobbyMembersColRef(lobbyId) : null,
  );
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
      if (!lobbyId) return;
      setDeleted(true);
      await deleteLobby.mutateAsync({ lobbyId });
    },
  };
};

export type LobbyInfo = { lobby: GroupLobby; memberCount: number };

export const useUserLobbies = (): LobbyInfo[] | undefined => {
  const { user } = useUserContext();

  // const cb = useCallback(, []);

  const lobbyCol = useCollectionRealtime(
    user ? lobbyMembers : null,
    user ? [where("userId", "==", user.uid)] : undefined,
    async (doc) => {
      const lobbyRef = doc.ref.parent.parent as DocumentReference<
        GroupLobby,
        GroupLobby
      >;
      const lobby = await getDoc(lobbyRef);
      // orphaned members from stale data or incorrect deletion
      if (!lobby.exists()) return undefined;
      return {
        lobby: lobby.data(),
        memberCount: (await getDocs(doc.ref.parent)).size,
      };
    },
  );

  // const res = use(Promise.all(lobbyInfo));

  // sometimes the index on the query doesn't immediately update
  // but if the member count is 0, it's safe to assume it doesn't exist
  return lobbyCol?.filter((l) => l !== undefined);
};
