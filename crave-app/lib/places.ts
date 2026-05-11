import { Restaurant } from "@crave/api";

function prettify(str: string) {
  return str
    .replace(/_/g, " ")
    .replace(
      /\w\S*/g,
      (txt) => txt.charAt(0).toUpperCase() + txt.substring(1).toLowerCase(),
    );
}

export type RestaurantSwipeData = {
  loading: boolean;
  id: string;
  name: string;
  cuisine?: string;
  rating?: number;
  distance?: string;
  price?: string;
  image?: string;
  address?: string;
  detailsUri?: string;
  websiteUri?: string;
  phone?: string,
  reviewSummary?: string,
  liveMusic?: boolean,
  delivery?: boolean,
  takeout?: boolean,
  allowsDogs?: boolean,
  goodForWatchingSports?: boolean,
  outdoorSeating?: boolean,
  curbsidePickup?: boolean,
  goodForChildren?: boolean,
  goodForGroups?: boolean,
};


export function transformPlacesApiData(
  restaurants: Restaurant[],
): RestaurantSwipeData[];
export function transformPlacesApiData(
  restaurants?: Restaurant[] | null,
): RestaurantSwipeData[] | undefined;
export function transformPlacesApiData(restaurants?: Restaurant[] | null) {
  if (!restaurants) return undefined;
  return restaurants.map(
    (r): RestaurantSwipeData => ({
      loading: false,
      id: r.resourceName,
      name: r.displayName,
      cuisine: r.cuisines.length ? prettify(r.cuisines[0]) : "American",
      rating: r.rating,
      distance: r.distanceMiles,
      address: r.address,
      detailsUri: r.detailsUri,
      websiteUri: r.websiteUri,
      image: r.primaryImage,
      price: r.priceRange
        ? `$${r.priceRange.startPrice.units}${r.priceRange.endPrice ? ` - $${r.priceRange.endPrice.units}` : ""}`
        : undefined,
        // Placeholders — replace with r.nationalPhoneNumber etc. once API returns them
      takeout: undefined,
      allowsDogs: undefined,
      curbsidePickup: r.curbsidePickup,
      delivery: r.delivery,
      goodForGroups: r.goodForGroups,
      goodForChildren: r.goodForChildren,
      goodForWatchingSports: r.goodForWatchingSports,
      outdoorSeating: r.outdoorSeating,
      liveMusic: r.liveMusic,
    }),
  );
}

export function skeletonPlacesData(): RestaurantSwipeData[] {
  return [...Array(10)].map((_, i) => ({
    loading: true,
    id: `skeleton-${i}`,
    name: "Restaurant",
    cuisine: "Food",
    rating: 3,
    distance: "5mi",
    price: "$10 - $20",
    image: undefined,
  }));
}
