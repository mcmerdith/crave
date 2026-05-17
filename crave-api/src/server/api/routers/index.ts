import { router } from "../trpc";
import { groupLobbyRouter } from "./grouplobby";
import { placesRouter } from "./places";
import { recommenderRouter } from "./recommender";

export const appRouter = router({
  places: placesRouter,
  recommender: recommenderRouter,
  groupLobby: groupLobbyRouter,
});

export type AppRouter = typeof appRouter;
