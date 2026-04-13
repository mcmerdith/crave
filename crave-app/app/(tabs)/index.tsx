import React, { useState } from "react";
import ModeSelection from "@/components/ModeSelection";
import { theme } from "@/theme";
import { SafeAreaView } from "react-native-safe-area-context";
import Carousel from "@/components/Carousel";
import { ScrollView, View } from "react-native";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import LocationHeader from "@/components/locationHeader";
import { trpc } from "@/lib/trpc";
import { useQuery } from "@tanstack/react-query";
import { transformPlacesApiData } from "@/lib/places";
import { useLocationContext } from "@/lib/context";
import RestaurantDetailModal from "@/components/RestaurantDetailModal";
import { RestaurantSwipeData } from "@/lib/places";
import LoadingScreen from "@/components/LoadingScreen";

export default function Index() {
  const { location } = useLocationContext();
  const { data: places, isLoading } = useQuery(
  trpc.places.search.queryOptions({
    center: location.coordinate ?? undefined,
  }),
);

  const RecentsData = places ? transformPlacesApiData(places) : [];
  const DiscoverData = RecentsData.toReversed();

  // State to track which restaurant is selected
  const [selectedRestaurant, setSelectedRestaurant] =
    useState<RestaurantSwipeData | null>(null);

  return (
    <GestureHandlerRootView style={{ flex: 1, backgroundColor: "#fff" }}>
      <ScrollView style={{ width: "100%", maxWidth: "100%" }}>
        <SafeAreaView
          style={{
            backgroundColor: theme.colors.background,
            width: "100%",
            height: "100%",
            display: "flex",
            justifyContent: "flex-start",
            alignItems: "flex-start",
          }}
        >
          <LocationHeader userName="Christian" />
          <ModeSelection />

          {/* Pass onItemPress to Carousel */}
          <Carousel
            title="Recent Cravings"
            data={RecentsData}
            onViewAll={() => console.log("View All pressed")}
            onItemPress={(restaurant) => setSelectedRestaurant(restaurant)}
          />

          <Carousel
            title="Discover New"
            data={DiscoverData}
            onViewAll={() => console.log("View All pressed")}
            onItemPress={(restaurant) => setSelectedRestaurant(restaurant)}
          />

          <View
            style={{ flex: 1, alignItems: "center", justifyContent: "center" }}
          />
        </SafeAreaView>
      </ScrollView>

      {/* Restaurant Detail Modal */}
      <RestaurantDetailModal
        visible={!!selectedRestaurant}
        restaurant={selectedRestaurant}
        onClose={() => setSelectedRestaurant(null)}
      />
      {isLoading && <LoadingScreen />}
    </GestureHandlerRootView>
  );
}