import { publicProcedure, router } from "../trpc";
import {
  autocomplete,
  getAutocompleteCoordinates,
  searchPlaces,
} from "@/server/api/maps-api";
import { Restaurant, SearchPlacesParams } from "@/server/api/types/places";
import {
  AutocompleteParams,
  AutocompleteResult,
  GetAutocompleteCoordinatesParams,
} from "@/server/api/types/autocomplete";
import { Coordinate } from "@/server/api/types/geography";

export const placesRouter = router({
  search: publicProcedure
    .input(SearchPlacesParams.partial())
    .output(Restaurant.array().optional())
    .query(async ({ input: { center, ...input } }) => {
      if (!center) return undefined;
      return await searchPlaces({ center, ...input });
    }),
  autocomplete: publicProcedure
    .input(AutocompleteParams.partial())
    .output(AutocompleteResult.optional())
    .query(async ({ input: { query, token } }) => {
      if (!query) return undefined;
      return await autocomplete({ query, token });
    }),
  getAutocompleteCoordinates: publicProcedure
    .input(GetAutocompleteCoordinatesParams.partial())
    .output(Coordinate.optional())
    .query(async ({ input: { resourceName, token } }) => {
      if (!resourceName || !token) return undefined;
      return await getAutocompleteCoordinates({ resourceName, token });
    }),
});
