import { publicProcedure, router } from "../trpc";
import { PlacesClient } from "@googlemaps/places";
import { Client } from "@googlemaps/google-maps-services-js";
import { env } from "@/env";
import { Place } from "../types";

const places = new PlacesClient({
  apiKey: env.GOOGLE_API_KEY,
});
const maps = new Client();

function fieldMask(fields: string[]) {
  return fields.map((f) => `places.${f}`).join(",")
}

function toMeters(miles: number) {
  return miles * 1609.34;
}

async function getCoordinates(query: string) {
  const data = await maps.geocode({
    params: {
      address: query,
      key: env.GOOGLE_API_KEY,
    },
  });
  // Return the data formatted for the places api
  const { lat, lng } = data.data.results[0].geometry.location;
  console.log("geocoded to", lat, lng)
  return {
    latitude: lat,
    longitude: lng,
  }
}

async function search() {
  const [data] = await places.searchNearby({
    includedPrimaryTypes: ["restaurant"],
    locationRestriction: {
      circle: {
        center: await getCoordinates("Newark, DE"),
        radius: toMeters(5)
      },
    },

  }, {
    otherArgs: {
      headers: {
        "X-Goog-FieldMask": fieldMask(["name", "displayName", "types", "currentOpeningHours"])
      }
    }
  });
  if (!data.places) return [];
  return data.places;
}

export const placesRouter = router({
  list: publicProcedure.output(Place.array()).query(async () => {
    // const res = await search()
    return [];
  }),
  // TODO
});
