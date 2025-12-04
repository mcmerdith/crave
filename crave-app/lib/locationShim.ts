import { Coordinate } from "@crave/api";

export type GeoLocation = {
  name: string;
  coordinate: Coordinate;
};

export const TempLocationData = [
  {
    name: "Newark, DE",
    coordinate: {
      latitude: 39.683722599999996,
      longitude: -75.74965720000002,
    },
  },
  {
    name: "Wilmington, DE",
    coordinate: {
      latitude: 39.744655,
      longitude: -75.5483909,
    },
  },
  {
    name: "Philadelphia, PA",
    coordinate: {
      latitude: 39.9525839,
      longitude: -75.1652215,
    },
  },
  {
    name: "Baltimore, MD",
    coordinate: {
      latitude: 39.2905023,
      longitude: -76.6104072,
    },
  },
  {
    name: "Washington, DC",
    coordinate: {
      latitude: 38.9071923,
      longitude: -77.0368707,
    },
  },
] as const satisfies GeoLocation[];
