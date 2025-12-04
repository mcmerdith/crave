import { Restaurant } from "@crave/api";
import { CardProps } from "@/components/Card";

export function transformPlacesApiData(restaurants?: Restaurant[] | null) {
  if (!restaurants) return undefined;
  return restaurants.map(
    (r): CardProps => ({
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
