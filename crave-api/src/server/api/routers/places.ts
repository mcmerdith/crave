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
  search: publicProcedure.input(SearchPlacesParams).query(async ({ input }) => {
    return await searchPlaces(input);
  }),
  autocomplete: publicProcedure
    .input(AutocompleteParams)
    .query(async ({ input }) => {
      return await autocomplete(input);
    }),
  getAutocompleteCoordinates: publicProcedure
    .input(GetAutocompleteCoordinatesParams)
    .query(async ({ input }) => {
      return await getAutocompleteCoordinates(input);
    }),
});
