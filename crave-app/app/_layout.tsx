import { Slot } from "expo-router";
import { QueryClientProvider } from "@tanstack/react-query";
import { queryClient } from "@/lib/trpc";
import "@/lib/firebase";
import { LocationContextProvider } from "@/lib/context";
import { useState } from "react";
import { GeoLocation, TempLocationData } from "@/lib/locationShim";

export default function RootLayout() {
  const [location, setLocation] = useState<GeoLocation>(TempLocationData[0]);
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
        <Slot />
      </LocationContextProvider>
    </QueryClientProvider>
  );
}
