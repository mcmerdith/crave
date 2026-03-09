import { loggedInProcedure, router } from "../trpc";
import { GroupLobby, SwipeResultSubmission } from "../types/group-mode";

export const recommenderRouter = router({
  createLobby: loggedInProcedure.output(GroupLobby).query(async ({ ctx }) => {
    // TODO: create lobby in DB
    return {
      id: "O98SF3", // chosen by totally random algorithm - http://imgur.com/YV9ORrO
      ownerId: ctx.user.id,
      status: "open",
      members: [ctx.user.id],
    };
  }),
  submitSwipes: loggedInProcedure
    .input(SwipeResultSubmission)
    .mutation(async ({ input }) => {
      // TODO: store restaurants to DB
      return;
    }),
});
