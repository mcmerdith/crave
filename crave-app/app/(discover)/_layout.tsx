import { Slot, Stack } from "expo-router";
import { Suspense } from "react";
import { SafeAreaView } from "react-native-safe-area-context";

export default function ProfileStackLayout() {
  return (
    <SafeAreaView
      style={{
        height: "100%",
        width: "100%",
        display: "flex",
        justifyContent: "flex-start",
        flexDirection: "column",
      }}
    >
      <Suspense fallback={<p>Loading</p>}>
        <Stack>
          <Stack.Screen
            name="filtersSolo"
            options={{ title: "Solo Filters", headerShown: false }}
          />
          <Stack.Screen
            name="swipe/[mode]/index"
            options={{ title: "Swipe", headerShown: false }}
          />
          <Stack.Screen
            name="swipe/[mode]/complete"
            options={{ title: "Swipe Complete", headerShown: false }}
          />
          <Stack.Screen
            name="swipe/group/lobby"
            options={{ title: "Group Lobby", headerShown: false }}
          />
        </Stack>
      </Suspense>
    </SafeAreaView>
  );
}
