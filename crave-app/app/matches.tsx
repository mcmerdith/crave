import { View } from "react-native";
import { Text } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Stack } from "expo-router";

export default function Matches() {
  return (
    <SafeAreaView>
      <View>
        <Text>Matches Screen</Text>
      </View>
      <Stack.Screen
        options={{
          title: "Matches",
        }}
      />
    </SafeAreaView>
  );
}
