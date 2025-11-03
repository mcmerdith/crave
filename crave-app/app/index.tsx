// index.tsx
import React from "react";
import { SafeAreaView } from "react-native";
import HomeScreen from "@/components/HomeScreen";

export default function Index() {
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <HomeScreen />
    </SafeAreaView>
  );
}
