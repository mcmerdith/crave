import React, { createContext, useContext, useState } from "react";
import { RestaurantSwipeData } from "@/lib/places";
// eslint-disable-next-line import/no-unresolved
import RestaurantDetailModal from "@/components/RestaurantDetailModal";

interface ContextType {
  openRestaurant: (restaurant: RestaurantSwipeData) => void;
  closeRestaurant: () => void;
}

const RestaurantModalContext = createContext<ContextType | null>(null);

export const useRestaurantModal = () => {
  const ctx = useContext(RestaurantModalContext);
  if (!ctx) throw new Error("useRestaurantModal must be used inside provider");
  return ctx;
};

export const RestaurantModalProvider: React.FC<{
  children: React.ReactNode;
}> = ({ children }) => {
  const [restaurant, setRestaurant] = useState<RestaurantSwipeData | null>(
    null,
  );

  const openRestaurant = (r: RestaurantSwipeData) => setRestaurant(r);
  const closeRestaurant = () => setRestaurant(null);

  return (
    <RestaurantModalContext.Provider
      value={{ openRestaurant, closeRestaurant }}
    >
      {children}

      <RestaurantDetailModal
        visible={restaurant !== null}
        restaurant={restaurant}
        onClose={closeRestaurant}
      />
    </RestaurantModalContext.Provider>
  );
};
