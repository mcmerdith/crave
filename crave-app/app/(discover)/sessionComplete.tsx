import { View, Text, StyleSheet } from "react-native";
import { useRouter } from "expo-router";
import { theme } from "@/theme";
import RestaurantCard from "@/components/restaurantCard";
import ColorfulButton from "@/components/colorfulButton";

export default function SessionComplete() {
  const router = useRouter();
  return (
    <View style={styles.container}>
      <Text style={styles.message}>What You&apos;re Craving</Text>
      {/* <Text style={styles.message}>You liked 6 restaurants</Text> */}
      <RestaurantCard restaurant={example} />

      <ColorfulButton
        variant="solo"
        onPress={() => router.replace("/(tabs)")}
        canStart={true}
        text="Go to Discover"
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    padding: 20,
  },
  message: {
    fontSize: 18,
    marginBottom: 20,
  },
  linkButton: {
    paddingVertical: 12,
    paddingHorizontal: 25,
    borderRadius: 8,
  },
  linkText: {
    color: theme.colors.black,
    fontSize: 16,
    fontWeight: "500",
  },
});

export const example = {
  name: "Taverna",
  cuisine: "Italian",
  rating: 4.8,
  distance: "0.5 mi",
  price: "$$",
  image:
    "https://vrconcierge.com/wp-content/uploads/2021/02/taverna-rustic-italian-newark-de-exterior-1-768x512.jpg",
};
