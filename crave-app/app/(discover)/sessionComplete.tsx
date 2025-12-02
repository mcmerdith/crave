import { View } from "react-native";
import { Text } from "react-native";
import { Link } from "expo-router";
import { Button } from "react-native";

export default function SwipeGroup() {
  return (
    <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
      <Text>Here's your matches!</Text>
      <Link href="/(tabs)" asChild>
        <Button title="Go to Discover" />
      </Link>
    </View>
  );
}
