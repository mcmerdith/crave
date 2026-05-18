import z from "zod";
import { firestore } from "../firebase";
import { publicProcedure, router } from "../trpc";
import { TRPCError } from "@trpc/server";
import { GroupLobby, GroupLobbyMember } from "../types/group-mode";
import { DocumentSnapshot, QuerySnapshot } from "firebase-admin/firestore";

export const groupLobbyRouter = router({
  deleteLobby: publicProcedure
    .input(z.object({ lobbyId: z.string() }))
    .mutation(async ({ input: { lobbyId } }) => {
      if (!lobbyId)
        throw new TRPCError({
          code: "BAD_REQUEST",
          message: "No lobby ID provided",
        });
      await firestore.recursiveDelete(firestore.doc(`lobbies/${lobbyId}`));
    }),
  userComplete: publicProcedure
    .input(z.object({ lobbyId: z.string() }))
    .mutation(async ({ input: { lobbyId } }) => {
      const lobbyRef = firestore.doc(`lobbies/${lobbyId}`);
      const lobby = (await lobbyRef.get()) as DocumentSnapshot<
        GroupLobby,
        GroupLobby
      >;
      if (!lobby)
        throw new TRPCError({
          code: "BAD_REQUEST",
          message: "Lobby not found",
        });
      const membersRef = firestore.collection(`lobbies/${lobbyId}/members`);
      const membersQuery = (await membersRef.get()) as QuerySnapshot<
        GroupLobbyMember,
        GroupLobbyMember
      >;
      if (!membersQuery || membersQuery.empty) return;

      const members = membersQuery.docs.map((d) => d.data());
      if (!members.every((m) => m.complete)) return;

      // Execute the recommendation algorithm
      const allMatches: Record<string, number> = {};

      for (const member of members) {
        for (const likedId of member.likeIds) {
          if (!(likedId in allMatches)) allMatches[likedId] = 1;
          else allMatches[likedId] += 1;
        }
        for (const dislikedId of member.dislikeIds) {
          if (!(dislikedId in allMatches)) allMatches[dislikedId] = -1;
          else allMatches[dislikedId] -= 1;
        }
      }

      const highestValue = -Infinity;
      let matchCandidates: string[] = [];

      for (const [id, value] of Object.entries(allMatches)) {
        if (value > highestValue) {
          matchCandidates = [id];
        } else if (value === highestValue) {
          matchCandidates.push(id);
        }
      }

      await lobbyRef.update({
        bestMatchId:
          matchCandidates[Math.floor(Math.random() * matchCandidates.length)],
      });
    }),
});
