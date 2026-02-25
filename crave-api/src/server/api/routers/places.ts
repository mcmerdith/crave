import {
  autocomplete,
  getAutocompleteCoordinates,
  searchPlaces,
} from "@/server/api/maps-api";
import {
  AutocompleteParams,
  AutocompleteResult,
  GetAutocompleteCoordinatesParams,
} from "@/server/api/types/autocomplete";
import { Coordinate } from "@/server/api/types/geography";
import { Restaurant, SearchPlacesParams } from "@/server/api/types/places";
import { publicProcedure, router } from "../trpc";

export const placesRouter = router({
  search: publicProcedure
    .input(SearchPlacesParams.partial())
    .output(Restaurant.array().nullable())
    .query(async ({ input: { center, ...input } }) => {
      if (!center) return null;
      return await searchPlaces({ center, ...input });
    }),
  autocomplete: publicProcedure
    .input(AutocompleteParams.partial())
    .output(AutocompleteResult.nullable())
    .query(async ({ input: { query, token } }) => {
      if (!query) return null;
      return await autocomplete({ query, token });
    }),
  getAutocompleteCoordinates: publicProcedure
    .input(GetAutocompleteCoordinatesParams.partial())
    .output(Coordinate.nullable())
    .query(async ({ input: { resourceName, token } }) => {
      if (!resourceName || !token) return null;
      return await getAutocompleteCoordinates({ resourceName, token });
    }),
});
