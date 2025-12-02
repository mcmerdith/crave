import { PlacesClient } from "@googlemaps/places";
import { Client } from "@googlemaps/google-maps-services-js";
import { env } from "@/env";
import { newUUID, toMeters } from "@/utils";
import {
  AutocompleteParams,
  GetAutocompleteCoordinatesParams,
  PlacesApiAutocompleteResult,
} from "@/server/api/types/autocomplete";
import { Coordinate } from "@/server/api/types/geography";
import {
  PlacesApiPlace,
  Restaurant,
  SearchPlacesParams,
} from "@/server/api/types/places";
import { mkdir, readFile, writeFile } from "node:fs/promises";
import { z } from "zod";
import path from "path";

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
  const cache = await readCache(
    "autocomplete",
    query,
    PlacesApiAutocompleteResult.array(),
  );
  if (cache) return { suggestions: cache, token };
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
  await writeCache("autocomplete", query, data.suggestions);
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
  const cache = await readCache(
    "autocomplete_coordinates",
    resourceName,
    Coordinate,
  );
  if (cache) return cache;
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
  await writeCache("autocomplete_coordinates", resourceName, data.location);
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
}: SearchPlacesParams) {
  const cache = await readCache(
    "places",
    `${center.latitude}_${center.longitude}`,
    Restaurant.array(),
  );
  if (cache) return cache;
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
  await writeCache(
    "places",
    `${center.latitude}_${center.longitude}`,
    data.places,
  );
  if (!data.places) return [];
  return Restaurant.array().parse(data.places);
}

function isInsignificantError(error: unknown): boolean {
  return (
    !error ||
    typeof error !== "object" ||
    !("code" in error) ||
    error.code === "ENOENT" ||
    error.code === "EEXIST"
  );
}

async function readCache<Parser extends z.ZodType>(
  prefix: string,
  identifier: string,
  parser: Parser,
): Promise<z.output<Parser> | null> {
  if (env.NODE_ENV !== "development") return null;
  try {
    const filename = `${prefix}-${identifier}.json`.replace(
      /[/\\:*?"<>|#%]/g,
      "_",
    );
    const data = await readFile(path.join("cache", filename), {
      encoding: "utf-8",
    });
    console.debug(`[Places-API] Using cache file ${filename}`);
    return parser.parse(JSON.parse(data));
  } catch (error) {
    if (!isInsignificantError(error)) throw error;
  }
  return null;
}

async function writeCache(prefix: string, identifier: string, data: unknown) {
  if (env.NODE_ENV !== "development") return;
  try {
    await mkdir("cache");
  } catch (error) {
    if (!isInsignificantError(error)) throw error;
  }
  try {
    const filename = `${prefix}-${identifier}.json`.replace(
      /[/\\:*?"<>|#%]/g,
      "_",
    );
    console.debug(`[Places-API] Writing cache file ${filename}`);
    await writeFile(path.join("cache", filename), JSON.stringify(data), {
      encoding: "utf-8",
    });
  } catch (error) {
    console.error("Writing to cache file failed!");
    if (!isInsignificantError(error)) throw error;
  }
}
