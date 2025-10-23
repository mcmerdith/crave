import { collection } from "@firebase/firestore";
import { firestore } from "@/lib/firebase";
import { z } from "zod/v4";

export const Location = z.object({
  placeId: z.string(),
  refreshedOn: z.date(),
  name: z.string(),
  displayName: z.string(),
  primaryType: z.string(),
  primaryTypeDisplayName: z.string(),

  formattedAddress: z.string(),
});
export type Location = z.infer<typeof Location>;

const locations = collection(firestore, "locations");

export function getLocations(filter: {}) {
  // TODO: fetch from database
}
