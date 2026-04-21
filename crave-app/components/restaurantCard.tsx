import React, { useState } from "react";
import { View, Text, Image, StyleSheet, Platform} from "react-native";
import { RestaurantSwipeData } from "@/lib/places";

function isValidImage(uri?: string) {
  if (!uri) return false;
  if (uri.includes("placehold.co")) return false;
  return true;
}

const ImageFallback = () => (
  <View style={styles.fallback}>
    <Image
      source={require("@/assets/images/white_burger_transparent.png")}
      style={styles.fallbackBurger}
      resizeMode="contain"
    />
    <Text style={styles.fallbackText}>image not available</Text>
  </View>
);

export default function RestaurantCard({
  restaurant,
}: {
  restaurant: RestaurantSwipeData;
}) {
  const [imgError, setImgError] = useState(false);
  const useLocal = imgError || !isValidImage(restaurant.image);
  
  return (
    <View style={styles.card}>
      {/* Top image */}
      <View style={styles.imageContainer}>
        {useLocal ? (
          <ImageFallback />
        ) : (
          <Image
            source={{ uri: restaurant.image }}
            onError={() => setImgError(true)}
            style={styles.image}
            resizeMode="cover"
          />
        )}
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
  fallback: {
    width: "100%",
    height: "100%",
    backgroundColor: "#d9d9d9",
    justifyContent: "center",
    alignItems: "center",
  },
  fallbackBurger: {
    width: 150,   // bigger since this card is much larger than the carousel card
    height: 150,
  },
  fallbackText: {
    fontFamily: "Nunito",
    fontSize: 20,
    color: "#ffffff",
    marginTop: 4,
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
