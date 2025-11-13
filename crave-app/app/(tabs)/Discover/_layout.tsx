import { Stack } from "expo-router";

export default function ProfileStackLayout() {
  return (
    <Stack>
      <Stack.Screen
        name="index"
        options={{ title: "Discover", headerShown: false }}
      />
      <Stack.Screen
        name="swipeSolo"
        options={{ title: "Swipe", headerShown: false }}
      />
      <Stack.Screen
        name="swipeGroup"
        options={{ title: "Swipe Group", headerShown: false }}
      />
    </Stack>
  );
}
