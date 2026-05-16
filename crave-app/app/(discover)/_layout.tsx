import { Slot, Stack } from "expo-router";
import { Suspense } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { GestureHandlerRootView } from "react-native-gesture-handler";

export default function ProfileStackLayout() {
  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <SafeAreaView
        style={{
          height: "100%",
          width: "100%",
          display: "flex",
          justifyContent: "flex-start",
          flexDirection: "column",
        }}
      >
        <Suspense fallback={<Text>Loading</Text>}>
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
    </GestureHandlerRootView>
  );
}
