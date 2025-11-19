import { z } from "zod";

export type { AppRouter } from "./routers/index"

export const Place = z.object({
  name: z.string(),
  primaryCuisine: z.string(),
  secondaryCuisines: z.string().array(),
  rating: z.number(),
  distance: z.string(),
  location: z.string(),
  price: z.string(),
  image: z.url(),
  serves: {
    beer: z.boolean(),
    breakfast: z.boolean(),
    // TODO
  },
  goodForGroups: z.boolean(),
  cuisine: z.string().array()
});
export type Place = z.infer<typeof Place>;
