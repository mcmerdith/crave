import { Slot } from "expo-router";
import { QueryClientProvider } from "@tanstack/react-query";
import { queryClient } from "@/lib/trpc";
import "@/lib/firebase";
import { LocationContextProvider, MatchContextProvider } from "@/lib/context";
import { useState } from "react";
import { GeoLocation, TempLocationData } from "@/lib/locationShim";
import { RestaurantSwipeData } from "@/lib/places";

export default function RootLayout() {
  const [location, setLocation] = useState<GeoLocation>(TempLocationData[0]);
  const [match, setMatch] = useState<RestaurantSwipeData | null>(null);
  return (
    <QueryClientProvider client={queryClient}>
      <LocationContextProvider
        value={{
          setNewLocation: (location) => {
            setLocation(location);
          },
          location,
        }}
      >
        <MatchContextProvider
          value={{
            setMatch: (match) => {
              setMatch(match);
            },
            match: match,
          }}
        >
          <Slot />
        </MatchContextProvider>
      </LocationContextProvider>
    </QueryClientProvider>
  );
}
