import { Slot } from "expo-router";
import { QueryClientProvider } from "@tanstack/react-query";
import { queryClient } from "@/lib/trpc";
import "@/lib/firebase";
import { LocationContextProvider, MatchContextProvider } from "@/lib/context";
import { useEffect, useState } from "react";
import { GeoLocation, TempLocationData } from "@/lib/locationShim";
import { RestaurantSwipeData } from "@/lib/places";
import { useFonts } from "expo-font";
import LoadingScreen from "@/components/LoadingScreen";

export default function RootLayout() {
  const [fontsLoaded] = useFonts({
    Fredoka: require("../assets/fonts/Fredoka-SemiBold.ttf"),
    Nunito: require("../assets/fonts/Nunito-SemiBold.ttf"),
  });

  const [ready, setReady] = useState(false);

  useEffect(() => {
    if (fontsLoaded) {
      const timer = setTimeout(() => setReady(true), 800);
      return () => clearTimeout(timer);
    }
  }, [fontsLoaded]);

  const [location, setLocation] = useState<GeoLocation>(TempLocationData[0]);
  const [match, setMatch] = useState<RestaurantSwipeData | null>(null);
  const [allMatches, setAllMatches] = useState<RestaurantSwipeData[]>([]);

  if (!fontsLoaded) {
    return null;
  }

  return (
    <>
      <QueryClientProvider client={queryClient}>
        <LocationContextProvider
          value={{
            setNewLocation: (location) => setLocation(location),
            location,
          }}
        >
          <MatchContextProvider
            value={{
              setMatch: (match) => setMatch(match),
              setAllMatches: (matches) => setAllMatches(matches),
              match,
              allMatches,
            }}
          >
            <Slot />
          </MatchContextProvider>
        </LocationContextProvider>
      </QueryClientProvider>

      {!ready && <LoadingScreen />}
    </>
  );
}