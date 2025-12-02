import { View, Text, Button } from "react-native";
import { Link } from "expo-router";

export default function SwipeGroup() {
  return (
    <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
      <Text>Here&apos;s your matches!</Text>
      <Link href="/(tabs)" asChild>
        <Button title="Go to Discover" />
      </Link>
    </View>
  );
}
