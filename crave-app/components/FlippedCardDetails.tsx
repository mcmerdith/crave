import { RestaurantSwipeData } from "@/lib/places";

export default function FlippedCardDetails({
  restaurant,
}: {
  restaurant: RestaurantSwipeData;
}) {
  return (
    <>
      <text>{restaurant.name}</text>
    </>
  );
}
