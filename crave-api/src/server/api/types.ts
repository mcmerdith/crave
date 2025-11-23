import { z } from "zod";

export type { AppRouter } from "./routers/index";

export * from "./types/autocomplete";
export * from "./types/places";

export const Coordinate = z.object({
  latitude: z.number(),
  longitude: z.number(),
});
export type Coordinate = z.infer<typeof Coordinate>;
