import React from "react";
import { View, Text, Image, StyleSheet } from "react-native";
import { RestaurantSwipeData } from "@/lib/places";

export default function RestaurantCard({
  restaurant,
}: {
  restaurant: RestaurantSwipeData;
}) {
  return (
    <View style={styles.card}>
      {/* Top image */}
      <View style={styles.imageContainer}>
        <Image
          source={{ uri: restaurant.image }}
          style={styles.image}
          resizeMode="cover"
        />
      </View>

      {/* Bottom info */}
      <View style={styles.infoBlock}>
        <Text style={styles.title}>{restaurant.name}</Text>

        <Text style={styles.subtitle}>
          {restaurant.cuisine} • {restaurant.price} • ⭐ {restaurant.rating}
        </Text>

        <Text style={styles.distance}>{restaurant.distance} away</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    width: "100%",
    aspectRatio: 1, // square card
    borderRadius: 15,
    overflow: "hidden",
    backgroundColor: "white",
  },

  imageContainer: {
    flex: 2,
    width: "100%",
  },
  image: {
    width: "100%",
    height: "100%",
  },

  infoBlock: {
    flex: 1,
    padding: 16,
    backgroundColor: "white",
    justifyContent: "center",
  },

  title: {
    fontSize: 22,
    fontWeight: "bold",
    color: "black",
  },
  subtitle: {
    color: "black",
    fontSize: 15,
    marginTop: 4,
  },
  distance: {
    color: "black",
    fontSize: 14,
    marginTop: 4,
  },
});
