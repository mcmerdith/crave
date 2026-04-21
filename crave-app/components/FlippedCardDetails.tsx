import { RestaurantSwipeData } from "@/lib/places";
import { Text } from "react-native";

export default function FlippedCardDetails({
  restaurant,
}: {
  restaurant: RestaurantSwipeData;
}) {
  return (
    <>
      <Text>{restaurant.name}</Text>
    </>
  );
}
