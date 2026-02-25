import { router } from "../trpc";
import { placesRouter } from "./places";
import { recommenderRouter } from "./recommender";

export const appRouter = router({
  places: placesRouter,
  recommender: recommenderRouter,
});

export type AppRouter = typeof appRouter;
