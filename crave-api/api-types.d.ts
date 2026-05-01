import * as _trpc_server from '@trpc/server';
import z$1, { z } from 'zod';

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
                center?: {
                    latitude: number;
                    longitude: number;
                } | undefined;
                radius?: number | undefined;
                maxPriceLevel?: number | undefined;
                sort?: "RELEVANCE" | "DISTANCE" | undefined;
            };
            output: {
                id: string;
                resourceName: string;
                displayName: string;
                cuisines: ("afghani" | "african" | "american" | "asian" | "barbecue" | "brazilian" | "chinese" | "french" | "greek" | "indian" | "indonesian" | "italian" | "japanese" | "korean" | "lebanese" | "mediterranean" | "mexican" | "middle_eastern" | "spanish" | "thai" | "turkish" | "vietnamese")[];
                attributes: ("breakfast" | "brunch" | "buffet" | "dessert" | "fast_food" | "fine_dining" | "hamburger" | "pizza" | "ramen" | "seafood" | "sushi" | "vegan" | "vegetarian")[];
                types: string[];
                address: string;
                coordinates: {
                    latitude: number;
                    longitude: number;
                };
                detailsUri: string;
                businessStatus: string;
                photos: unknown[];
                rating: number;
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
                curbsidePickup: boolean;
                delivery: boolean;
                goodForGroups: boolean;
                goodForChildren: boolean;
                goodForWatchingSports: boolean;
                outdoorSeating: boolean;
                liveMusic: boolean;
                websiteUri?: string | undefined;
                distanceMiles?: string | undefined;
                primaryImage?: string | undefined;
            }[] | null;
            meta: object;
        }>;
        autocomplete: _trpc_server.TRPCQueryProcedure<{
            input: {
                query?: string | undefined;
                token?: string | undefined;
            };
            output: {
                suggestions: {
                    text: string;
                    placeId: string;
                    resourceName: string;
                }[];
                token: string;
            } | null;
            meta: object;
        }>;
        getAutocompleteCoordinates: _trpc_server.TRPCQueryProcedure<{
            input: {
                resourceName?: string | undefined;
                token?: string | undefined;
            };
            output: {
                latitude: number;
                longitude: number;
            } | null;
            meta: object;
        }>;
    }>>;
    recommender: _trpc_server.TRPCBuiltRouter<{
        ctx: {
            user: {
                id: string;
            } | null;
        };
        meta: object;
        errorShape: _trpc_server.TRPCDefaultErrorShape;
        transformer: false;
    }, _trpc_server.TRPCDecorateCreateRouterOptions<{}>>;
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
declare const AutocompleteResult: z.ZodObject<{
    suggestions: z.ZodArray<z.ZodObject<{
        text: z.ZodString;
        placeId: z.ZodString;
        resourceName: z.ZodString;
    }, z.core.$strip>>;
    token: z.ZodString;
}, z.core.$strip>;
type AutocompleteResult = z.infer<typeof AutocompleteResult>;
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

declare const Coordinate: z.ZodObject<{
    latitude: z.ZodNumber;
    longitude: z.ZodNumber;
}, z.core.$strip>;
type Coordinate = z.infer<typeof Coordinate>;

declare const GroupLobbyId: z$1.ZodString;
type GroupLobbyId = z$1.infer<typeof GroupLobbyId>;
declare const GroupLobbyStatus: z$1.ZodEnum<{
    open: "open";
    "in-progress": "in-progress";
    complete: "complete";
}>;
type GroupLobbyStatus = z$1.infer<typeof GroupLobbyStatus>;
declare const GroupLobby: z$1.ZodObject<{
    id: z$1.ZodString;
    ownerId: z$1.ZodString;
    status: z$1.ZodEnum<{
        open: "open";
        "in-progress": "in-progress";
        complete: "complete";
    }>;
}, z$1.core.$strip>;
type GroupLobby = z$1.infer<typeof GroupLobby>;
declare const SwipeResult: z$1.ZodObject<{
    selectedRestaurantIds: z$1.ZodArray<z$1.ZodString>;
    rejectedRestaurantIds: z$1.ZodArray<z$1.ZodString>;
}, z$1.core.$strip>;
type SwipeResult = z$1.infer<typeof SwipeResult>;
declare const SwipeResultSubmission: z$1.ZodObject<{
    lobbyId: z$1.ZodOptional<z$1.ZodString>;
    result: z$1.ZodObject<{
        selectedRestaurantIds: z$1.ZodArray<z$1.ZodString>;
        rejectedRestaurantIds: z$1.ZodArray<z$1.ZodString>;
    }, z$1.core.$strip>;
}, z$1.core.$strip>;
type SwipeResultSubmission = z$1.infer<typeof SwipeResultSubmission>;
declare const GroupLobbyMember: z$1.ZodObject<{
    userId: z$1.ZodString;
    name: z$1.ZodString;
    complete: z$1.ZodBoolean;
    likeIds: z$1.ZodArray<z$1.ZodString>;
    dislikeIds: z$1.ZodArray<z$1.ZodString>;
}, z$1.core.$strip>;
type GroupLobbyMember = z$1.infer<typeof GroupLobbyMember>;

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
    id: z.ZodString;
    name: z.ZodString;
    displayName: z.ZodObject<{
        text: z.ZodString;
    }, z.core.$strip>;
    types: z.ZodArray<z.ZodString>;
    formattedAddress: z.ZodString;
    location: z.ZodObject<{
        latitude: z.ZodNumber;
        longitude: z.ZodNumber;
    }, z.core.$strip>;
    googleMapsUri: z.ZodString;
    businessStatus: z.ZodString;
    photos: z.ZodArray<z.ZodUnknown>;
    rating: z.ZodNumber;
    websiteUri: z.ZodOptional<z.ZodString>;
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
    curbsidePickup: z.ZodCoercedBoolean<unknown>;
    delivery: z.ZodCoercedBoolean<unknown>;
    goodForGroups: z.ZodCoercedBoolean<unknown>;
    goodForChildren: z.ZodCoercedBoolean<unknown>;
    goodForWatchingSports: z.ZodCoercedBoolean<unknown>;
    outdoorSeating: z.ZodCoercedBoolean<unknown>;
    liveMusic: z.ZodCoercedBoolean<unknown>;
}, z.core.$strip>;
type PlacesApiPlace = z.infer<typeof PlacesApiPlace>;
declare const Place: z.ZodObject<{
    id: z.ZodString;
    name: z.ZodString;
    displayName: z.ZodObject<{
        text: z.ZodString;
    }, z.core.$strip>;
    types: z.ZodArray<z.ZodString>;
    formattedAddress: z.ZodString;
    location: z.ZodObject<{
        latitude: z.ZodNumber;
        longitude: z.ZodNumber;
    }, z.core.$strip>;
    googleMapsUri: z.ZodString;
    businessStatus: z.ZodString;
    photos: z.ZodArray<z.ZodUnknown>;
    rating: z.ZodNumber;
    websiteUri: z.ZodOptional<z.ZodString>;
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
    curbsidePickup: z.ZodCoercedBoolean<unknown>;
    delivery: z.ZodCoercedBoolean<unknown>;
    goodForGroups: z.ZodCoercedBoolean<unknown>;
    goodForChildren: z.ZodCoercedBoolean<unknown>;
    goodForWatchingSports: z.ZodCoercedBoolean<unknown>;
    outdoorSeating: z.ZodCoercedBoolean<unknown>;
    liveMusic: z.ZodCoercedBoolean<unknown>;
    distanceMiles: z.ZodOptional<z.ZodString>;
    primaryImage: z.ZodOptional<z.ZodString>;
}, z.core.$strip>;
type Place = z.infer<typeof Place>;
declare const Restaurant: z.ZodObject<{
    id: z.ZodString;
    resourceName: z.ZodString;
    displayName: z.ZodString;
    cuisines: z.ZodArray<z.ZodEnum<{
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
    }>>;
    attributes: z.ZodArray<z.ZodEnum<{
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
    }>>;
    types: z.ZodArray<z.ZodString>;
    address: z.ZodString;
    coordinates: z.ZodObject<{
        latitude: z.ZodNumber;
        longitude: z.ZodNumber;
    }, z.core.$strip>;
    detailsUri: z.ZodString;
    websiteUri: z.ZodOptional<z.ZodString>;
    businessStatus: z.ZodString;
    photos: z.ZodArray<z.ZodUnknown>;
    rating: z.ZodNumber;
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
    distanceMiles: z.ZodOptional<z.ZodString>;
    primaryImage: z.ZodOptional<z.ZodString>;
    curbsidePickup: z.ZodCoercedBoolean<unknown>;
    delivery: z.ZodCoercedBoolean<unknown>;
    goodForGroups: z.ZodCoercedBoolean<unknown>;
    goodForChildren: z.ZodCoercedBoolean<unknown>;
    goodForWatchingSports: z.ZodCoercedBoolean<unknown>;
    outdoorSeating: z.ZodCoercedBoolean<unknown>;
    liveMusic: z.ZodCoercedBoolean<unknown>;
}, z.core.$strip>;
type Restaurant = z.infer<typeof Restaurant>;
declare const RestaurantParser: z.ZodPipe<z.ZodObject<{
    id: z.ZodString;
    name: z.ZodString;
    displayName: z.ZodObject<{
        text: z.ZodString;
    }, z.core.$strip>;
    types: z.ZodArray<z.ZodString>;
    formattedAddress: z.ZodString;
    location: z.ZodObject<{
        latitude: z.ZodNumber;
        longitude: z.ZodNumber;
    }, z.core.$strip>;
    googleMapsUri: z.ZodString;
    businessStatus: z.ZodString;
    photos: z.ZodArray<z.ZodUnknown>;
    rating: z.ZodNumber;
    websiteUri: z.ZodOptional<z.ZodString>;
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
    curbsidePickup: z.ZodCoercedBoolean<unknown>;
    delivery: z.ZodCoercedBoolean<unknown>;
    goodForGroups: z.ZodCoercedBoolean<unknown>;
    goodForChildren: z.ZodCoercedBoolean<unknown>;
    goodForWatchingSports: z.ZodCoercedBoolean<unknown>;
    outdoorSeating: z.ZodCoercedBoolean<unknown>;
    liveMusic: z.ZodCoercedBoolean<unknown>;
    distanceMiles: z.ZodOptional<z.ZodString>;
    primaryImage: z.ZodOptional<z.ZodString>;
}, z.core.$strip>, z.ZodTransform<{
    id: string;
    resourceName: string;
    displayName: string;
    cuisines: RestaurantCuisine[];
    attributes: RestaurantAttribute[];
    types: string[];
    address: string;
    coordinates: {
        latitude: number;
        longitude: number;
    };
    detailsUri: string;
    businessStatus: string;
    photos: unknown[];
    rating: number;
    websiteUri: string | undefined;
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
    distanceMiles: string | undefined;
    primaryImage: string | undefined;
    curbsidePickup: boolean;
    delivery: boolean;
    goodForGroups: boolean;
    goodForChildren: boolean;
    goodForWatchingSports: boolean;
    outdoorSeating: boolean;
    liveMusic: boolean;
}, {
    id: string;
    name: string;
    displayName: {
        text: string;
    };
    types: string[];
    formattedAddress: string;
    location: {
        latitude: number;
        longitude: number;
    };
    googleMapsUri: string;
    businessStatus: string;
    photos: unknown[];
    rating: number;
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
    curbsidePickup: boolean;
    delivery: boolean;
    goodForGroups: boolean;
    goodForChildren: boolean;
    goodForWatchingSports: boolean;
    outdoorSeating: boolean;
    liveMusic: boolean;
    websiteUri?: string | undefined;
    distanceMiles?: string | undefined;
    primaryImage?: string | undefined;
}>>;

declare const UserId: z$1.ZodString;
type UserId = z$1.infer<typeof UserId>;
declare const UserPreferences: z$1.ZodObject<{
    userId: z$1.ZodString;
    dietary: z$1.ZodObject<{
        vegetarian: z$1.ZodBoolean;
        vegan: z$1.ZodBoolean;
        glutenFree: z$1.ZodBoolean;
    }, z$1.core.$strip>;
    recentMatchIds: z$1.ZodArray<z$1.ZodString>;
}, z$1.core.$strip>;
type UserPreferences = z$1.infer<typeof UserPreferences>;

export { AutocompleteParams, AutocompleteResult, Coordinate, GetAutocompleteCoordinatesParams, GroupLobby, GroupLobbyId, GroupLobbyMember, GroupLobbyStatus, Place, PlacesApiAutocompleteResult, PlacesApiPlace, Restaurant, RestaurantAttribute, RestaurantCuisine, RestaurantParser, SearchPlacesParams, SwipeResult, SwipeResultSubmission, UserId, UserPreferences };
export type { AppRouter };
