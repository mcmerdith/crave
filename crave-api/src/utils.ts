/** Helper function for geocoding */
export function toMeters(miles: number) {
  return miles * 1609.34;
}

/** Helper function for geocoding */
export function toMiles(meters: number) {
  return meters / 1609.34;
}

export { v4 as newUUID } from "uuid";
