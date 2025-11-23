import { z } from "zod";

export const Coordinate = z.object({
  latitude: z.number(),
  longitude: z.number(),
});
export type Coordinate = z.infer<typeof Coordinate>;
