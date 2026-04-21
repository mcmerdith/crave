import React, { useState } from "react";
import { Image, StyleSheet, Text, View } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import Skeleton from "react-native-reanimated-skeleton";
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

const Card: React.FC<RestaurantSwipeData> = ({
  loading,
  name,
  cuisine,
  rating,
  distance,
  price,
  image,
}) => {
  const [imgError, setImgError] = useState(false);
  const useLocal = imgError || !isValidImage(image);
  
  return (
    <Skeleton containerStyle={styles.card} isLoading={loading}>
              {loading || useLocal ? (
          <ImageFallback />
        ) : (
          <Image
            source={{ uri: image }}
            onError={() => setImgError(true)}
            style={styles.image}
          />
        )}
      <Text style={styles.title}>{name}</Text>
      <Text style={styles.subtitle}>{cuisine}</Text>

      <View style={styles.infoRow}>
        {rating && (
          <View style={styles.infoItem}>
            <Ionicons name="star" size={14} color="#F6BE00" />
            <Text style={styles.infoText}>{rating}</Text>
          </View>
        )}

        {distance && (
          <View style={styles.infoItem}>
            <Ionicons name="location-outline" size={14} color="#777" />
            <Text style={styles.infoText}>{distance}</Text>
          </View>
        )}

        {price && <Text style={styles.price}>{price}</Text>}
      </View>
    </Skeleton>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: "#fff",
    borderRadius: 16,
    marginRight: 16,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
    width: 180,
    height: 205,
  },
  image: {
    width: "100%",
    height: 110,
    borderTopLeftRadius: 16,
    borderTopRightRadius: 16,
  },
  title: {
    fontSize: 15,
    fontWeight: "600",
    marginHorizontal: 10,
    marginTop: 6,
    height: 40,
  },
  subtitle: {
    color: "#777",
    marginHorizontal: 10,
    fontSize: 13,
    height: 15,
  },
  infoRow: {
    flexDirection: "row",
    alignItems: "center",
    marginHorizontal: 10,
    marginVertical: 8,
    height: 15,
  },
  infoItem: {
    flexDirection: "row",
    alignItems: "center",
    marginRight: 8,
  },
  infoText: {
    fontSize: 12,
    color: "#555",
    marginLeft: 2,
  },
  price: {
    fontSize: 12,
    color: "#555",
    marginLeft: "auto",
  },
  fallback: {
    width: "100%",
    height: 110,
    borderTopLeftRadius: 16,
    borderTopRightRadius: 16,
    backgroundColor: "#d9d9d9",
    justifyContent: "center",
    alignItems: "center",
  },
  fallbackBurger: {
    width: 60,
    height: 60,
  },
  fallbackText: {
    fontFamily: "Nunito",  
    fontSize: 14,
    color: "#ffffff",
    marginTop: -2,
  },
});

export default Card;
