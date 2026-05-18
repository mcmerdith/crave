import AsyncStorage from "@react-native-async-storage/async-storage";
import {
  Dispatch,
  SetStateAction,
  useCallback,
  useEffect,
  useState,
} from "react";

/**
 * Stateful values with persistence.
 *
 * Values must be JSON-encodable
 */
export function useStoredState<T>(
  value: T,
  key: string,
): [T, Dispatch<SetStateAction<T>>] {
  const [data, setData] = useState(value);

  useEffect(() => {
    AsyncStorage.getItem(key, (err, val) => {
      if (err) console.error(`Failed to load stored state for '${key}'`, err);
      console.log("State Load:", key, val);
      if (!val) return;
      setData(JSON.parse(val));
    });
  }, [key]);

  const setStoredData = useCallback(
    (value: T | ((prev: T) => T)) => {
      setData(value);
      AsyncStorage.setItem(key, JSON.stringify(value));
    },
    [key],
  );

  return [data, setStoredData];
}
