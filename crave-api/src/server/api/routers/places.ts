import { publicProcedure, router } from "../trpc";

export const placesRouter = router({
  list: publicProcedure.query(() => ({
    id: "1234"
  }))
  // TODO
});
