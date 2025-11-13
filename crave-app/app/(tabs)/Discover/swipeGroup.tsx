import { View } from "react-native";
import { Text } from "react-native";
import { Link } from "expo-router";
import { Button } from "react-native";

export default function SwipeGroup() {
  return (
    <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
      <Text>This is the group swipe page</Text>
      <Link href="/Discover" asChild>
        <Button title="Go to index" />
      </Link>
    </View>
  );
}
