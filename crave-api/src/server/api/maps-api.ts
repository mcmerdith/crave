import { PlacesClient } from "@googlemaps/places";
import { Client } from "@googlemaps/google-maps-services-js";
import { env } from "@/env";
import {
  Coordinate,
  Location,
  PlacesApiPlace,
  AutocompleteParams,
  GetAutocompleteCoordinatesParams,
  PlacesApiAutocompleteResult,
} from "@/server/api/types";
import { newUUID, toMeters } from "@/utils";

const placesApi = new PlacesClient({
  apiKey: env.GOOGLE_API_KEY,
});
const mapsApi = new Client();

function fieldMaskHeader(fields: readonly string[]) {
  return {
    "X-Goog-FieldMask": fields.join(","),
  };
}

function toTypes(attributes?: string[]): string[] {
  return attributes?.map((a) => `${a}_restaurant`) ?? [];
}

export async function autocomplete({ query, token }: AutocompleteParams) {
  token ??= newUUID(); // generate a new token if none is provided
  const [data] = await placesApi.autocompletePlaces(
    {
      input: query,
      includedPrimaryTypes: ["(cities)"],
      regionCode: "us",
      sessionToken: token,
    },
    {
      otherArgs: {
        headers: fieldMaskHeader([
          "suggestions.placePrediction.text.text",
          "suggestions.placePrediction.place",
          "suggestions.placePrediction.placeId",
        ]),
      },
    },
  );
  return {
    suggestions: data.suggestions
      ? PlacesApiAutocompleteResult.array().parse(data.suggestions)
      : [],
    token,
  };
}

export async function getAutocompleteCoordinates({
  resourceName,
  token,
}: GetAutocompleteCoordinatesParams) {
  const [data] = await placesApi.getPlace(
    {
      name: resourceName,
      sessionToken: token,
    },
    {
      otherArgs: {
        headers: fieldMaskHeader(["location"]),
      },
    },
  );

  return Coordinate.parse(data.location);
}

/** Get the coordinates for a given query */
export async function getCoordinates(query: string) {
  const data = await mapsApi.geocode({
    params: {
      address: query,
      key: env.GOOGLE_API_KEY,
    },
  });
  // Return the data formatted for the places api
  if (data.data.results.length === 0)
    throw new Error(`No results for location: ${query}`);
  if (data.data.results.length > 1)
    console.warn(`Multiple results for location: ${query}`);
  const { lat, lng } = data.data.results[0].geometry.location;
  return {
    latitude: lat,
    longitude: lng,
  } satisfies Coordinate;
}

/**
 * Search for places near a given location
 *
 * @param center The coordinates search's center
 * @param radius The radius (in meters) to search around the center
 * @param maxPriceLevel A value from 0-5 representing the maximum price level of the places to search for
 * @todo replace with a raw REST call due to the SDK not handling pagination correctly and maxes out at 20 results
 */
export async function searchPlaces({
  center,
  radius = toMeters(10),
  maxPriceLevel = 5,
  // sort = "RELEVANCE",
}: {
  center: Coordinate;
  radius?: number;
  maxPriceLevel?: number;
  sort?: "RELEVANCE" | "DISTANCE";
}) {
  const [data] = await placesApi.searchText(
    {
      textQuery: "restaurants nearby",
      includedType: "restaurant",
      strictTypeFiltering: true,
      openNow: true,
      priceLevels: [0, 2, 3, 4, 5].filter((l) => l <= maxPriceLevel),
      regionCode: "us",
      locationBias: {
        circle: {
          center: center,
          radius: radius,
        },
      },
    },
    {
      autoPaginate: false,
      otherArgs: {
        headers: fieldMaskHeader(
          PlacesApiPlace.keyof().options.map((f) => `places.${f}`),
        ),
      },
    },
  );
  console.debug(`found ${data.places?.length} locations`);
  if (!data.places) return [];
  return Location.array().parse(data.places);
}
