import { router } from "../trpc";
import { placesRouter } from "./places";

export const appRouter = router({
  places: placesRouter,
});

export type AppRouter = typeof appRouter;
