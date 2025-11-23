import { z } from "zod";

import { Coordinate } from "@/server/api/types/geography";

export const SearchPlacesParams = z.object({
  center: Coordinate,
  radius: z.number().optional(),
  maxPriceLevel: z.number().min(0).max(5).optional(),
  sort: z.enum(["RELEVANCE", "DISTANCE"]).optional(),
});
export type SearchPlacesParams = z.infer<typeof SearchPlacesParams>;

/* Defines for types returned by the places api. They appear in responses suffixed by "_restaurant" */

export const RestaurantCuisine = z.enum([
  "afghani",
  "african",
  "american",
  "asian",
  "barbecue",
  "brazilian",
  "chinese",
  "french",
  "greek",
  "indian",
  "indonesian",
  "italian",
  "japanese",
  "korean",
  "lebanese",
  "mediterranean",
  "mexican",
  "middle_eastern",
  "spanish",
  "thai",
  "turkish",
  "vietnamese",
]);
export type RestaurantCuisine = z.infer<typeof RestaurantCuisine>;

export const RestaurantAttribute = z.enum([
  "breakfast",
  "brunch",
  "buffet",
  "dessert",
  "fast_food",
  "fine_dining",
  "hamburger",
  "pizza",
  "ramen",
  "seafood",
  "sushi",
  "vegan",
  "vegetarian",
]);
export type RestaurantAttribute = z.infer<typeof RestaurantAttribute>;

export const PlacesApiPlace = z.object({
  name: z.string(), // essentials (ids), pro search
  id: z.string(), // essentials (ids), pro search
  displayName: z.object({ text: z.string() }), // pro, pro search
  types: z.string().array(), // essentials, pro search TODO: make this typed
  formattedAddress: z.string(), // essentials, pro search
  location: Coordinate, // essentials, pro search
  rating: z.number(), // enterprise, enterprise search
  googleMapsUri: z.string(), // pro, pro search
  websiteUri: z.string().optional(), // enterprise, enterprise search
  // currentOpeningHours: z.unknown(), // enterprise, enterprise search
  // regularOpeningHours: z.unknown(), // enterprise, enterprise search TODO: make this typed
  // photos: z.unknown().array(), // essentials (ids), pro search TODO: make this typed
  businessStatus: z.string(), // pro, pro search TODO: enum
  priceLevel: z.string(), // enterprise, enterprise search TODO: enum
  priceRange: z
    .object({
      startPrice: z.object({
        currencyCode: z.string(),
        units: z.coerce.number(),
        nanos: z.number(),
      }),
      endPrice: z
        .object({
          currencyCode: z.string(),
          units: z.coerce.number(),
          nanos: z.number(),
        })
        .nullable(),
    })
    .nullable(), // enterprise, enterprise search TODO: enum
});
export type PlacesApiPlace = z.infer<typeof PlacesApiPlace>;

export const Restaurant = PlacesApiPlace.transform((p) => ({
  resourceName: p.name,
  id: p.id,
  displayName: p.displayName.text,
  cuisines: p.types
    .map((t) => t.replace(/_restaurant$/, ""))
    .filter((t) => t in RestaurantCuisine.enum) as RestaurantCuisine[],
  attributes: p.types
    .map((t) => t.replace(/_restaurant$/, ""))
    .filter((t) => t in RestaurantAttribute.enum) as RestaurantAttribute[],
  types: p.types.filter((t) => !t.endsWith("_restaurant")),
  address: p.formattedAddress,
  coordinates: p.location,
  mapsUri: p.googleMapsUri,
  websiteUri: p.websiteUri,
  // regularHours: p.regularOpeningHours,
  // photos: p.photos,
  businessStatus: p.businessStatus,
  priceRange: p.priceRange,
}));
export type Location = z.infer<typeof Restaurant>;
