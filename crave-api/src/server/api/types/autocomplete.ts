import { z } from "zod";

export const AutocompleteParams = z.object({
  query: z.string(),
  token: z.string().optional(),
});
export type AutocompleteParams = z.infer<typeof AutocompleteParams>;

export const GetAutocompleteCoordinatesParams = z.object({
  resourceName: z.string().refine((s) => s.startsWith("places/")),
  token: z.string(),
});
export type GetAutocompleteCoordinatesParams = z.infer<
  typeof GetAutocompleteCoordinatesParams
>;

export const AutocompleteResult = z.object({
  suggestions: z
    .object({
      text: z.string(),
      placeId: z.string(),
      resourceName: z.string(),
    })
    .array(),
  token: z.string(),
});
export type AutocompleteResult = z.infer<typeof AutocompleteResult>;

export const PlacesApiAutocompleteResult = z
  .object({
    placePrediction: z.object({
      text: z.object({ text: z.string() }),
      place: z.string(),
      placeId: z.string(),
    }),
  })
  .transform(
    (suggestion) =>
      ({
        text: suggestion.placePrediction.text.text,
        placeId: suggestion.placePrediction.placeId,
        resourceName: suggestion.placePrediction.place,
      }) satisfies AutocompleteResult["suggestions"][number],
  );
