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
  /* SKU Text Search Essentials ID Only */
  id: z.string(),
  name: z.string(),
  /* SKU Text Search Pro */
  displayName: z.object({ text: z.string() }),
  types: z.string().array(), // TODO: make this typed
  formattedAddress: z.string(),
  location: Coordinate,
  googleMapsUri: z.string(),
  businessStatus: z.string(), // TODO: enum
  photos: z.unknown().array(), // TODO: make this typed
  /* SKU Text Search Enterprise */
  // currentOpeningHours: z.unknown(),
  // regularOpeningHours: z.unknown(), // TODO: make this typed
  rating: z.number(),
  // websiteUri: z.string().optional(),
  // priceLevel: z.string(), // TODO: enum
  priceRange: z.object({
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
  }),
  //   .nullable(), // TODO: enum
  /* SKU Text Search Enterprise + Atmosphere */
  // curbsidePickup
  // delivery
  // dineIn
  // goodForGroups
  // takeout
  // serves* -> (beer, breakfast, brunch, cocktails, coffee, dessert, dinner, lunch, vegetarian, wine)
});
export type PlacesApiPlace = z.infer<typeof PlacesApiPlace>;

export const Restaurant = PlacesApiPlace.transform((p) => ({
  id: p.id,
  resourceName: p.name,
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
  businessStatus: p.businessStatus,
  photos: p.photos,
  // currentHours: p.currentOpeningHours,
  // regularHours: p.regularOpeningHours,
  rating: p.rating,
  // websiteUri: p.websiteUri,
  // websiteUri: p.websiteUri,
  // priceLevel: p.priceLevel,
  priceRange: p.priceRange,
}));
export type Restaurant = z.infer<typeof Restaurant>;
