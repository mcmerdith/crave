import * as _trpc_server from '@trpc/server';
import { z } from 'zod';

declare const appRouter: _trpc_server.TRPCBuiltRouter<{
    ctx: {
        user: {
            id: string;
        } | null;
    };
    meta: object;
    errorShape: _trpc_server.TRPCDefaultErrorShape;
    transformer: false;
}, _trpc_server.TRPCDecorateCreateRouterOptions<{
    places: _trpc_server.TRPCBuiltRouter<{
        ctx: {
            user: {
                id: string;
            } | null;
        };
        meta: object;
        errorShape: _trpc_server.TRPCDefaultErrorShape;
        transformer: false;
    }, _trpc_server.TRPCDecorateCreateRouterOptions<{
        search: _trpc_server.TRPCQueryProcedure<{
            input: {
                center: {
                    latitude: number;
                    longitude: number;
                };
                radius?: number | undefined;
                maxPriceLevel?: number | undefined;
                sort?: "RELEVANCE" | "DISTANCE" | undefined;
            };
            output: never[];
            meta: object;
        }>;
        autocomplete: _trpc_server.TRPCQueryProcedure<{
            input: {
                query: string;
                token?: string | undefined;
            };
            output: {
                suggestions: {
                    text: string;
                    placeId: string;
                    resourceName: string;
                }[];
                token: string;
            };
            meta: object;
        }>;
        getAutocompleteCoordinates: _trpc_server.TRPCQueryProcedure<{
            input: {
                resourceName: string;
                token: string;
            };
            output: {
                latitude: number;
                longitude: number;
            };
            meta: object;
        }>;
    }>>;
}>>;
type AppRouter = typeof appRouter;

declare const AutocompleteParams: z.ZodObject<{
    query: z.ZodString;
    token: z.ZodOptional<z.ZodString>;
}, z.core.$strip>;
type AutocompleteParams = z.infer<typeof AutocompleteParams>;
declare const GetAutocompleteCoordinatesParams: z.ZodObject<{
    resourceName: z.ZodString;
    token: z.ZodString;
}, z.core.$strip>;
type GetAutocompleteCoordinatesParams = z.infer<typeof GetAutocompleteCoordinatesParams>;
declare const PlacesApiAutocompleteResult: z.ZodPipe<z.ZodObject<{
    placePrediction: z.ZodObject<{
        text: z.ZodObject<{
            text: z.ZodString;
        }, z.core.$strip>;
        place: z.ZodString;
        placeId: z.ZodString;
    }, z.core.$strip>;
}, z.core.$strip>, z.ZodTransform<{
    text: string;
    placeId: string;
    resourceName: string;
}, {
    placePrediction: {
        text: {
            text: string;
        };
        place: string;
        placeId: string;
    };
}>>;
type PlacesApiAutocompleteResult = z.infer<typeof PlacesApiAutocompleteResult>;

declare const SearchPlacesParams: z.ZodObject<{
    center: z.ZodObject<{
        latitude: z.ZodNumber;
        longitude: z.ZodNumber;
    }, z.core.$strip>;
    radius: z.ZodOptional<z.ZodNumber>;
    maxPriceLevel: z.ZodOptional<z.ZodNumber>;
    sort: z.ZodOptional<z.ZodEnum<{
        RELEVANCE: "RELEVANCE";
        DISTANCE: "DISTANCE";
    }>>;
}, z.core.$strip>;
type SearchPlacesParams = z.infer<typeof SearchPlacesParams>;
declare const RestaurantCuisine: z.ZodEnum<{
    afghani: "afghani";
    african: "african";
    american: "american";
    asian: "asian";
    barbecue: "barbecue";
    brazilian: "brazilian";
    chinese: "chinese";
    french: "french";
    greek: "greek";
    indian: "indian";
    indonesian: "indonesian";
    italian: "italian";
    japanese: "japanese";
    korean: "korean";
    lebanese: "lebanese";
    mediterranean: "mediterranean";
    mexican: "mexican";
    middle_eastern: "middle_eastern";
    spanish: "spanish";
    thai: "thai";
    turkish: "turkish";
    vietnamese: "vietnamese";
}>;
type RestaurantCuisine = z.infer<typeof RestaurantCuisine>;
declare const RestaurantAttribute: z.ZodEnum<{
    breakfast: "breakfast";
    brunch: "brunch";
    buffet: "buffet";
    dessert: "dessert";
    fast_food: "fast_food";
    fine_dining: "fine_dining";
    hamburger: "hamburger";
    pizza: "pizza";
    ramen: "ramen";
    seafood: "seafood";
    sushi: "sushi";
    vegan: "vegan";
    vegetarian: "vegetarian";
}>;
type RestaurantAttribute = z.infer<typeof RestaurantAttribute>;
declare const PlacesApiPlace: z.ZodObject<{
    name: z.ZodString;
    id: z.ZodString;
    displayName: z.ZodObject<{
        text: z.ZodString;
    }, z.core.$strip>;
    types: z.ZodArray<z.ZodString>;
    formattedAddress: z.ZodString;
    location: z.ZodObject<{
        latitude: z.ZodNumber;
        longitude: z.ZodNumber;
    }, z.core.$strip>;
    rating: z.ZodNumber;
    googleMapsUri: z.ZodString;
    websiteUri: z.ZodOptional<z.ZodString>;
    businessStatus: z.ZodString;
    priceLevel: z.ZodString;
    priceRange: z.ZodNullable<z.ZodObject<{
        startPrice: z.ZodObject<{
            currencyCode: z.ZodString;
            units: z.ZodCoercedNumber<unknown>;
            nanos: z.ZodNumber;
        }, z.core.$strip>;
        endPrice: z.ZodNullable<z.ZodObject<{
            currencyCode: z.ZodString;
            units: z.ZodCoercedNumber<unknown>;
            nanos: z.ZodNumber;
        }, z.core.$strip>>;
    }, z.core.$strip>>;
}, z.core.$strip>;
type PlacesApiPlace = z.infer<typeof PlacesApiPlace>;
declare const Restaurant: z.ZodPipe<z.ZodObject<{
    name: z.ZodString;
    id: z.ZodString;
    displayName: z.ZodObject<{
        text: z.ZodString;
    }, z.core.$strip>;
    types: z.ZodArray<z.ZodString>;
    formattedAddress: z.ZodString;
    location: z.ZodObject<{
        latitude: z.ZodNumber;
        longitude: z.ZodNumber;
    }, z.core.$strip>;
    rating: z.ZodNumber;
    googleMapsUri: z.ZodString;
    websiteUri: z.ZodOptional<z.ZodString>;
    businessStatus: z.ZodString;
    priceLevel: z.ZodString;
    priceRange: z.ZodNullable<z.ZodObject<{
        startPrice: z.ZodObject<{
            currencyCode: z.ZodString;
            units: z.ZodCoercedNumber<unknown>;
            nanos: z.ZodNumber;
        }, z.core.$strip>;
        endPrice: z.ZodNullable<z.ZodObject<{
            currencyCode: z.ZodString;
            units: z.ZodCoercedNumber<unknown>;
            nanos: z.ZodNumber;
        }, z.core.$strip>>;
    }, z.core.$strip>>;
}, z.core.$strip>, z.ZodTransform<{
    resourceName: string;
    id: string;
    displayName: string;
    cuisines: RestaurantCuisine[];
    attributes: RestaurantAttribute[];
    types: string[];
    address: string;
    coordinates: {
        latitude: number;
        longitude: number;
    };
    mapsUri: string;
    websiteUri: string | undefined;
    businessStatus: string;
    priceRange: {
        startPrice: {
            currencyCode: string;
            units: number;
            nanos: number;
        };
        endPrice: {
            currencyCode: string;
            units: number;
            nanos: number;
        } | null;
    } | null;
}, {
    name: string;
    id: string;
    displayName: {
        text: string;
    };
    types: string[];
    formattedAddress: string;
    location: {
        latitude: number;
        longitude: number;
    };
    rating: number;
    googleMapsUri: string;
    businessStatus: string;
    priceLevel: string;
    priceRange: {
        startPrice: {
            currencyCode: string;
            units: number;
            nanos: number;
        };
        endPrice: {
            currencyCode: string;
            units: number;
            nanos: number;
        } | null;
    } | null;
    websiteUri?: string | undefined;
}>>;
type Location = z.infer<typeof Restaurant>;

declare const Coordinate: z.ZodObject<{
    latitude: z.ZodNumber;
    longitude: z.ZodNumber;
}, z.core.$strip>;
type Coordinate = z.infer<typeof Coordinate>;

export { AutocompleteParams, Coordinate, GetAutocompleteCoordinatesParams, PlacesApiAutocompleteResult, PlacesApiPlace, Restaurant, RestaurantAttribute, RestaurantCuisine, SearchPlacesParams };
export type { AppRouter, Location };
