import { View } from "react-native";
import { Text } from "react-native";
import { Link } from "expo-router";
import { Button } from "react-native";

export default function Matches() {
  return (
    <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
      <Text>This is the matches tab</Text>
      <Link href="/Discover" asChild>
        <Button title="Go to index" />
      </Link>
    </View>
  );
}
