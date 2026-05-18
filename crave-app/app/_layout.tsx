import LoadingScreen from "@/components/LoadingScreen";
import {
  LobbyContextProvider,
  LocationContextProvider,
  SwipeContextProvider,
  UserContextProvider,
} from "@/lib/context";
import {
  useLoggedInUser,
  useSessionManager,
} from "@/lib/datastore/user-service";
import "@/lib/firebase";
import { useStoredState } from "@/lib/hooks/state-storage";
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

  const [match, setMatch] = useStoredState<RestaurantSwipeData | null>(
    null,
    "swipe-match",
  );
  const [allMatches, setAllMatches] = useStoredState<RestaurantSwipeData[]>(
    [],
    "swipe-all-matches",
  );
  const [allOptions, setAllOptions] = useStoredState<RestaurantSwipeData[]>(
    [],
    "swipe-all-options",
  );

  const [lobbyId, setLobbyId] = useStoredState<string | null>(
    null,
    "group-lobby-id",
  );
  const [createLobby, setCreateLobby] = useStoredState<boolean>(
    false,
    "create-group-lobby",
  );

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
            <SwipeContextProvider
              value={{
                setMatch: (match) => setMatch(match),
                setAllMatches: (matches) => setAllMatches(matches),
                setAllOptions: (options) => setAllOptions(options),
                match,
                allMatches,
                allOptions,
              }}
            >
              <LobbyContextProvider
                value={{
                  lobbyId,
                  create: createLobby,
                  setCurrentLobby: (lobbyId, create) => {
                    setLobbyId(lobbyId);
                    setCreateLobby(create);
                  },
                }}
              >
                <ConfirmProvider>
                  <Slot />
                </ConfirmProvider>
              </LobbyContextProvider>
            </SwipeContextProvider>
          </LocationContextProvider>
        </QueryClientProvider>
      </UserContextProvider>

      {!ready && <LoadingScreen />}
    </>
  );
}
