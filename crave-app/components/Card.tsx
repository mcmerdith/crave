import React from "react";
import { View, Text, Image, StyleSheet } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import Skeleton from "react-native-reanimated-skeleton";

export interface CardProps {
  loading: boolean;
  id: string;
  name: string;
  cuisine?: string;
  rating?: number;
  distance?: string;
  price?: string;
  image?: string;
}

const Card: React.FC<CardProps> = ({
  loading,
  name,
  cuisine,
  rating,
  distance,
  price,
  image,
}) => {
  return (
    <Skeleton containerStyle={styles.card} isLoading={loading}>
      <Image
        source={{
          uri: loading
            ? undefined
            : (image ??
              "https://placehold.co/600x600/?text=Image+Not+Available"),
        }}
        style={styles.image}
      />
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
});

export default Card;
