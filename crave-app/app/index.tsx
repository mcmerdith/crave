// index.tsx
import React from "react";
import { SafeAreaView } from "react-native";
import HomeScreen from "@/components/HomeScreen";
import { theme } from "@/theme";

export default function Index() {
  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: theme.colors.background }}>
      <HomeScreen />
    </SafeAreaView>
  );
}