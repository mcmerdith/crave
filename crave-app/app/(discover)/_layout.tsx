import { Stack } from "expo-router";

export default function ProfileStackLayout() {
  return (
    <Stack>
      <Stack.Screen
        name="filtersSolo"
        options={{ title: "Filter Solo", headerShown: false }}
      />
      <Stack.Screen
        name="groupLobby"
        options={{ title: "groupLobby", headerShown: false }}
      />
      <Stack.Screen
        name="swipe/[mode]"
        options={{ title: "Swipe Group", headerShown: false }}
      />
    </Stack>
  );
}
