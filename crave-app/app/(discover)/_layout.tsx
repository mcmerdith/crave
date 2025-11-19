import { Stack } from "expo-router";

export default function ProfileStackLayout() {
  return (
    <Stack>
      <Stack.Screen
        name="swipeSolo"
        options={{ title: "Swipe Solo", headerShown: false }}
      />
      <Stack.Screen
        name="filtersSolo"
        options={{ title: "Filter Solo", headerShown: false }}
      />
      <Stack.Screen
        name="swipeGroup"
        options={{ title: "Swipe Group", headerShown: false }}
      />
    </Stack>
  );
}
