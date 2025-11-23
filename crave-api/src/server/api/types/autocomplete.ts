import { z } from "zod";

export const AutocompleteParams = z.object({
  query: z.string(),
  token: z.string().optional(),
});
export type AutocompleteParams = z.infer<typeof AutocompleteParams>;

export const GetAutocompleteCoordinatesParams = z.object({
  resourceName: z.string(),
  token: z.string(),
});
export type GetAutocompleteCoordinatesParams = z.infer<
  typeof GetAutocompleteCoordinatesParams
>;

export const PlacesApiAutocompleteResult = z
  .object({
    placePrediction: z.object({
      text: z.object({ text: z.string() }),
      place: z.string(),
      placeId: z.string(),
    }),
  })
  .transform((suggestion) => ({
    text: suggestion.placePrediction.text.text,
    placeId: suggestion.placePrediction.placeId,
    resourceName: suggestion.placePrediction.place,
  }));
export type PlacesApiAutocompleteResult = z.infer<
  typeof PlacesApiAutocompleteResult
>;
