import { Context, createContext, useContext } from "react";
import { GeoLocation } from "@/lib/locationShim";
import { RestaurantSwipeData } from "@/lib/places";

export type Store<T> =
  | {
      initialized: true;
      name: string;
      data: T;
    }
  | {
      initialized: false;
      name: string;
      data: null;
    };

function createWrappedContext<T>(name: string, defaultValue?: T | undefined) {
  const context = createContext<Store<T>>(
    defaultValue
      ? {
          initialized: true,
          name,
          data: defaultValue,
        }
      : {
          initialized: false,
          name,
          data: null,
        },
  );

  return {
    context,
    Provider: ({
      value,
      ...props
    }: { value: T } & Omit<
      React.ComponentPropsWithoutRef<typeof context.Provider>,
      "value"
    >) => (
      <context.Provider
        value={{ initialized: true, name, data: value }}
        {...props}
      />
    ),
  };
}

function useWrappedContext<T>(context: Context<Store<T>>) {
  const { initialized, name, data } = useContext(context);
  if (!initialized) {
    throw new Error(`${name}Context not initialized`);
  }
  return data;
}

export const { context: LocationContext, Provider: LocationContextProvider } =
  createWrappedContext<{
    setNewLocation: (location: GeoLocation) => void;
    location: GeoLocation;
  }>("Location");
export const useLocationContext = () => useWrappedContext(LocationContext);

export const { context: MatchContext, Provider: MatchContextProvider } =
  createWrappedContext<{
    setMatch: (match: RestaurantSwipeData) => void;
    match: RestaurantSwipeData | null;
  }>("Match");
export const useMatchContext = () => useWrappedContext(MatchContext);
