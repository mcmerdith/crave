import { publicProcedure, router } from "../trpc";
import {
  autocomplete,
  getAutocompleteCoordinates,
  searchPlaces,
} from "@/server/api/maps-api";
import { SearchPlacesParams } from "@/server/api/types/places";
import {
  AutocompleteParams,
  GetAutocompleteCoordinatesParams,
} from "@/server/api/types/autocomplete";

export const placesRouter = router({
  search: publicProcedure
    .input(SearchPlacesParams.partial())
    .query(async ({ input: { center, ...input } }) => {
      if (!center) return null;
      return await searchPlaces({ center, ...input });
    }),
  autocomplete: publicProcedure
    .input(AutocompleteParams.partial())
    .query(async ({ input: { query, token } }) => {
      if (!query) return null;
      return await autocomplete({ query, token });
    }),
  getAutocompleteCoordinates: publicProcedure
    .input(GetAutocompleteCoordinatesParams.partial())
    .query(async ({ input: { resourceName, token } }) => {
      if (!resourceName || !token) return null;
      return await getAutocompleteCoordinates({ resourceName, token });
    }),
});
