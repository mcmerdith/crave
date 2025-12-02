import React from "react";
import ModeSelection from "@/components/ModeSelection";
import { theme } from "@/theme";
import { SafeAreaView } from "react-native-safe-area-context";
import Carousel from "@/components/Carousel";
import { ScrollView } from "react-native";
import { View } from "react-native";
import { GestureHandlerRootView } from "react-native-gesture-handler";

import type { SpringConfig } from "react-native-reanimated/lib/typescript/animation/spring";
import { trpc } from "@/lib/trpc";
import { useQuery } from "@tanstack/react-query";
import { CardProps } from "@/components/Card";
const SWIPE_SPRING_CONFIG: SpringConfig = {
  damping: 2,
  stiffness: 100,
  mass: 100,
  overshootClamping: true,
};

export default function Index() {
  const { data: location } = useQuery(
    trpc.places.autocomplete.queryOptions({ query: "Newark, DE" }),
  );
  const { data: coordinates } = useQuery(
    trpc.places.getAutocompleteCoordinates.queryOptions({
      resourceName: location?.suggestions[0]?.resourceName,
      token: location?.token,
    }),
  );
  const { data: places } = useQuery(
    trpc.places.search.queryOptions({ center: coordinates ?? undefined }),
  );
  const RecentsData = places?.map(
    (p): CardProps => ({
      name: p.displayName,
      cuisine: p.cuisines.length ? p.cuisines[0] : "American",
      rating: p.rating,
      distance: "5mi",
      image: "https://placehold.co/600x600/?text=Image+Coming+Soon",
      price: `$${p.priceRange.startPrice.units}${
        p.priceRange.endPrice ? ` - $${p.priceRange.endPrice.units}` : ""
      }`,
    }),
  );
  const DiscoverData = places
    ?.map(
      (p): CardProps => ({
        name: p.displayName,
        cuisine: p.cuisines.length ? p.cuisines[0] : "American",
        rating: p.rating,
        distance: "5mi",
        image: "https://placehold.co/600x600/?text=Image+Coming+Soon",
        price: `$${p.priceRange.startPrice.units}${
          p.priceRange.endPrice ? ` - $${p.priceRange.endPrice.units}` : ""
        }`,
      }),
    )
    .reverse();
  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
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
        <ModeSelection />
        <ScrollView style={{ width: "100%", maxWidth: "100%" }}>
          <Carousel
            title="Recent Cravings"
            data={RecentsData ?? []}
            onViewAll={() => console.log("View All pressed")}
          />
          <Carousel
            title="Discover New"
            data={DiscoverData ?? []}
            onViewAll={() => console.log("View All pressed")}
          />
          <View
            style={{ flex: 1, alignItems: "center", justifyContent: "center" }}
          ></View>
        </ScrollView>
      </SafeAreaView>
    </GestureHandlerRootView>
  );
}

const RecentsData = [
  {
    name: "Taverna",
    cuisine: "Italian",
    rating: 4.8,
    distance: "0.5 mi",
    price: "$$",
    image:
      "https://vrconcierge.com/wp-content/uploads/2021/02/taverna-rustic-italian-newark-de-exterior-1-768x512.jpg",
  },
  {
    name: "El Diablo",
    cuisine: "Mexican",
    rating: 4.4,
    distance: "0.5 mi",
    price: "$",
    image:
      "https://images.squarespace-cdn.com/content/v1/58b57e8b2e69cffff969c6cd/1488299173082-81E2GCSB63YW66RKF8HO/Burrito_wood_retouched.jpg?format=1500w",
  },
  {
    name: "m2o Burger",
    cuisine: "American",
    rating: 4.9,
    distance: "0.4 mi",
    price: "$",
    image:
      "https://media-cdn.grubhub.com/image/upload/d_search:browse-images:default.jpg/w_1200,q_auto,fl_lossy,dpr_auto,c_fill,f_auto,h_800,g_auto/wtisrayz07qylnbwba6e",
  },
];

const DiscoverData = [
  {
    name: "Taverna",
    cuisine: "Italian",
    rating: 4.8,
    distance: "0.5 mi",
    price: "$$",
    image:
      "https://vrconcierge.com/wp-content/uploads/2021/02/taverna-rustic-italian-newark-de-exterior-1-768x512.jpg",
  },
  {
    name: "El Diablo",
    cuisine: "Mexican",
    rating: 4.4,
    distance: "0.5 mi",
    price: "$",
    image:
      "https://images.squarespace-cdn.com/content/v1/58b57e8b2e69cffff969c6cd/1488299173082-81E2GCSB63YW66RKF8HO/Burrito_wood_retouched.jpg?format=1500w",
  },
  {
    name: "m2o Burger",
    cuisine: "American",
    rating: 4.9,
    distance: "0.4 mi",
    price: "$",
    image:
      "https://media-cdn.grubhub.com/image/upload/d_search:browse-images:default.jpg/w_1200,q_auto,fl_lossy,dpr_auto,c_fill,f_auto,h_800,g_auto/wtisrayz07qylnbwba6e",
  },
];
