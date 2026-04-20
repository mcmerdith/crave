import React from "react";
import { View, Text, Image, StyleSheet, Platform} from "react-native";
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
        <Text style={styles.title} numberOfLines={1}>
          {restaurant.name}
        </Text>
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
    height: 400,
    borderRadius: 15,
    overflow: "hidden",
    backgroundColor: "white",
    flexShrink: 0,
    flexGrow: 0,
  },
  imageContainer: {
    width: "100%",
    height: 268,  // fixed proportion instead of flex: 2
    overflow: "hidden",
  },
  image: {
    width: "100%",
    height: "100%",
  },
  infoBlock: {
    width: "100%",
    height: 132,  // fixed proportion instead of flex: 1
    padding: 16,
    backgroundColor: "white",
    justifyContent: "center",
    overflow: "hidden",
  },
  title: {
    fontSize: 22,
    fontWeight: "bold",
    color: "black",
    flexShrink: 1,
    overflow: "hidden",
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
