import { Tabs } from "expo-router";
import React from "react";
import AntDesign from "@expo/vector-icons/AntDesign";
import Feather from "@expo/vector-icons/Feather";
import Octicons from "@expo/vector-icons/Octicons";

export default function RootLayout() {
  return (
    <Tabs>
      <Tabs.Screen
        name="index"
        options={{
          headerShown: false,
          title: "Discover",
          tabBarIcon: ({ color, size }) => (
            <AntDesign name="compass" size={24} color="color" />
          ),
        }}
      />
      <Tabs.Screen
        name="matches"
        options={{
          headerShown: false,
          title: "Matches",
          tabBarIcon: ({ color, size }) => (
            <Feather name="heart" size={24} color="color" />
          ),
        }}
      />
      <Tabs.Screen
        name="filters"
        options={{
          headerShown: false,
          title: "Filters",
          tabBarIcon: ({ color, size }) => (
            <Octicons name="sliders" size={24} color="color" />
          ),
        }}
      />
    </Tabs>
  );
}
