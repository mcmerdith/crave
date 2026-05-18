import { View, Text, StyleSheet } from "react-native";
import { useLocalSearchParams, useRouter } from "expo-router";
import { theme } from "@/theme";
import RestaurantCard from "@/components/restaurantCard";
import ColorfulButton from "@/components/colorfulButton";
import { useLobbyContext, useSwipeContext } from "@/lib/context";
import { SwipeModeParams } from "@/lib/routeParams";
import FullPageMessage from "@/components/FullPageMessage";
import { useGroupLobby } from "@/lib/hooks/group-lobby";
import { Home } from "lucide-react-native";

export default function Complete() {
  const router = useRouter();

  const { mode } = useLocalSearchParams<SwipeModeParams>();

  const { match: soloMatch, allOptions } = useSwipeContext();
  const { lobbyId } = useLobbyContext();
  const lobby = useGroupLobby(lobbyId);

  const match =
    mode === "solo"
      ? soloMatch
      : allOptions.find((option) => option.id === lobby?.bestMatchId);

  if (!match) {
    return (
      <FullPageMessage
        title="Something went wrong"
        message="We couldn't find a match"
        CloseIcon={Home}
        closeText="Return to Home"
        onClose={() => router.replace("/")}
      />
    );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.message}>
        {mode === "group" ? "It's a match!" : "Cravings, satisfied!"}
      </Text>
      {/* <Text style={styles.message}>You liked 6 restaurants</Text> */}
      <RestaurantCard restaurant={match} />

      <ColorfulButton
        variant="solo"
        onPress={() => router.replace("/(tabs)")}
        enabled={true}
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
    fontFamily: "Fredoka",
    fontSize: 42,
    color: "#FF4747",
    textAlign: "center",
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
