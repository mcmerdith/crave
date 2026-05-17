import z from "zod";
import { firestore } from "../firebase";
import { publicProcedure, router } from "../trpc";
import { TRPCError } from "@trpc/server";

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
});
