import { publicProcedure, router } from "../trpc";

export const appRouter = router({
  places: publicProcedure.query(() => {
    return { id: "1234" };
  }),
});

export type AppRouter = typeof appRouter;
