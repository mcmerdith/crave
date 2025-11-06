import { Tabs } from "expo-router";
import { QueryClientProvider } from "@tanstack/react-query";
import { queryClient } from "@/lib/trpc";
import React from "react";
import AntDesign from "@expo/vector-icons/AntDesign";
import Feather from "@expo/vector-icons/Feather";
import Octicons from "@expo/vector-icons/Octicons";

export default function RootLayout() {
  return (
    <QueryClientProvider client={queryClient}>
      <Tabs>
        <Tabs.Screen
          name="index"
          options={{
            tabBarIcon: ({ color, size }) => (
              <AntDesign name="compass" size={24} color="color" />
            ),
          }}
        />
        <Tabs.Screen
          name="matches"
          options={{
            tabBarIcon: ({ color, size }) => (
              <Feather name="heart" size={24} color="color" />
            ),
          }}
        />
        <Tabs.Screen
          name="filter"
          options={{
            tabBarIcon: ({ color, size }) => (
              <Octicons name="sliders" size={24} color="color" />
            ),
          }}
        />
      </Tabs>
    </QueryClientProvider>
  );
}
