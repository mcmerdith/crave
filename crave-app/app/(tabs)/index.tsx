import React from "react";
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

export default function Index() {
  const { location } = useLocationContext();
  const { data: places } = useQuery(
    trpc.places.search.queryOptions({
      center: location.coordinate ?? undefined,
    }),
  );
  const RecentsData = transformPlacesApiData(places);
  const DiscoverData = RecentsData?.toReversed();
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
          <Carousel
            title="Recent Cravings"
            data={RecentsData}
            onViewAll={() => console.log("View All pressed")}
          />
          <Carousel
            title="Discover New"
            data={DiscoverData}
            onViewAll={() => console.log("View All pressed")}
          />
          <View
            style={{ flex: 1, alignItems: "center", justifyContent: "center" }}
          ></View>
        </SafeAreaView>
      </ScrollView>
    </GestureHandlerRootView>
  );
}
