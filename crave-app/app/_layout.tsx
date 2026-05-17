import LoadingScreen from "@/components/LoadingScreen";
import {
  LocationContextProvider,
  MatchContextProvider,
  UserContextProvider,
} from "@/lib/context";
import {
  useSessionManager,
  useLoggedInUser,
} from "@/lib/datastore/user-service";
import "@/lib/firebase";
import { GeoLocation, TempLocationData } from "@/lib/locationShim";
import { RestaurantSwipeData } from "@/lib/places";
import { queryClient } from "@/lib/trpc";
import { QueryClientProvider } from "@tanstack/react-query";
import { useFonts } from "expo-font";
import { Slot } from "expo-router";
import { useEffect, useState } from "react";
import { ConfirmProvider } from "react-native-confirm-dialog";

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

  const user = useLoggedInUser();
  const credentialManager = useSessionManager();

  if (!fontsLoaded) {
    return null;
  }

  return (
    <>
      <UserContextProvider value={{ ...user, ...credentialManager }}>
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
              <ConfirmProvider>
                <Slot />
              </ConfirmProvider>
            </MatchContextProvider>
          </LocationContextProvider>
        </QueryClientProvider>
      </UserContextProvider>

      {!ready && <LoadingScreen />}
    </>
  );
}
