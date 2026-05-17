import Carousel from "@/components/Carousel";
import LoadingScreen from "@/components/LoadingScreen";
import LocationHeader from "@/components/locationHeader";
import ModeSelection from "@/components/ModeSelection";
import RestaurantDetailModal from "@/components/RestaurantDetailModal";
import { useLocationContext, useUserContext } from "@/lib/context";
import { RestaurantSwipeData, transformPlacesApiData } from "@/lib/places";
import { trpc } from "@/lib/trpc";
import { theme } from "@/theme";
import { useQuery } from "@tanstack/react-query";
import React, { useState } from "react";
import { ScrollView, View } from "react-native";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { SafeAreaView } from "react-native-safe-area-context";

export default function Index() {
  const { user } = useUserContext();
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
          <LocationHeader userName={user?.displayName ?? "User"} />
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
