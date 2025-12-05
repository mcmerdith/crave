import { Restaurant } from "@crave/api";

export type RestaurantSwipeData = {
  loading: boolean;
  id: string;
  name: string;
  cuisine?: string;
  rating?: number;
  distance?: string;
  price?: string;
  image?: string;
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
      cuisine: r.cuisines.length ? r.cuisines[0] : "American",
      rating: r.rating,
      distance: r.distanceMiles,
      image: r.primaryImage,
      price: r.priceRange
        ? `$${r.priceRange.startPrice.units}${r.priceRange.endPrice ? ` - $${r.priceRange.endPrice.units}` : ""}`
        : undefined,
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
