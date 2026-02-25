import React from "react";
import { View, Text, StyleSheet, Image, ScrollView } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { RestaurantSwipeData } from "@/lib/places";

const hours = "11:00 AM - 10:00 PM";
const phone = "(555) 123-4567";
const website = "www.restaurant.com";

const reviews = [
  {
    name: "Sarah M.",
    rating: 5,
    comment: "Amazing food and great atmosphere!",
    date: "2 days ago",
  },
  {
    name: "John D.",
    rating: 4,
    comment: "Delicious! Will definitely come back.",
    date: "1 week ago",
  },
  {
    name: "Emily R.",
    rating: 5,
    comment: "Best in the area. Highly recommend!",
    date: "2 weeks ago",
  },
];

interface Props {
  restaurant: RestaurantSwipeData;
}

const RestaurantDetails: React.FC<Props> = ({ restaurant }) => {
  return (
    <ScrollView
      contentContainerStyle={styles.content}
      showsVerticalScrollIndicator={false}
    >
      {/* Image
      <Image
        source={{
          uri:
            restaurant.image || "https://placehold.co/600x600/?text=No+Image",
        }}
        style={styles.image}
        resizeMode="cover"
      /> */}
      {/* Name & Cuisine */}
      <Text style={styles.name}>{restaurant.name}</Text>
      <Text style={styles.cuisine}>{restaurant.cuisine}</Text>
      {/* Rating / Distance / Price */}
      <View style={styles.infoRow}>
        {restaurant.rating && (
          <View style={styles.infoItem}>
            <Ionicons name="star" size={16} color="#F6BE00" />
            <Text style={styles.infoText}>{restaurant.rating}</Text>
          </View>
        )}

        {restaurant.distance && (
          <View style={styles.infoItem}>
            <Ionicons name="location-outline" size={16} color="#777" />
            <Text style={styles.infoText}>{restaurant.distance}</Text>
          </View>
        )}

        {restaurant.price && (
          <Text style={styles.price}>{restaurant.price}</Text>
        )}
      </View>
      {/* Contact & Hours */}
      <View style={styles.card}>
        <Text style={styles.sectionTitle}>Contact & Hours</Text>

        <View style={styles.infoRowLarge}>
          <Ionicons name="time-outline" size={18} color="#777" />
          <View>
            <Text style={styles.infoLabel}>Open Today</Text>
            <Text style={styles.infoValue}>{hours}</Text>
          </View>
        </View>

        <View style={styles.infoRowLarge}>
          <Ionicons name="call-outline" size={18} color="#777" />
          <Text style={styles.infoValue}>{phone}</Text>
        </View>

        <View style={styles.infoRowLarge}>
          <Ionicons name="globe-outline" size={18} color="#777" />
          <Text style={[styles.infoValue, { color: "#6C47FF" }]}>
            {website}
          </Text>
        </View>
      </View>
      {/* Reviews */}
      <View style={styles.card}>
        <Text style={styles.sectionTitle}>Recent Reviews</Text>

        {reviews.map((review, index) => (
          <View
            key={index}
            style={[
              styles.reviewContainer,
              index !== reviews.length - 1 && styles.reviewBorder,
            ]}
          >
            <View style={styles.reviewHeader}>
              <Text style={styles.reviewName}>{review.name}</Text>

              <View style={{ flexDirection: "row" }}>
                {[...Array(review.rating)].map((_, i) => (
                  <Ionicons
                    key={i}
                    name="star"
                    size={14}
                    color="#F6BE00"
                    style={{ marginLeft: 2 }}
                  />
                ))}
              </View>
            </View>

            <Text style={styles.reviewComment}>{review.comment}</Text>
            <Text style={styles.reviewDate}>{review.date}</Text>
          </View>
        ))}
      </View>
    </ScrollView>
  );
};

export default RestaurantDetails;
const styles = StyleSheet.create({
  content: {
    padding: 16,
    paddingBottom: 40,
    backgroundColor: "#F9F9F9",
  },

  image: {
    width: "100%",
    height: 220,
    borderRadius: 20,
    marginBottom: 16,
  },

  name: {
    fontSize: 24,
    fontWeight: "700",
    marginBottom: 4,
  },

  cuisine: {
    fontSize: 16,
    color: "#777",
    marginBottom: 12,
  },

  infoRow: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 16,
  },

  infoItem: {
    flexDirection: "row",
    alignItems: "center",
    marginRight: 16,
  },

  infoText: {
    fontSize: 14,
    color: "#555",
    marginLeft: 4,
  },

  price: {
    fontSize: 14,
    color: "#555",
  },

  card: {
    backgroundColor: "#fff",
    borderRadius: 20,
    padding: 16,
    marginTop: 16,
    shadowColor: "#000",
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 3,
  },

  sectionTitle: {
    fontSize: 18,
    fontWeight: "600",
    marginBottom: 12,
  },

  infoRowLarge: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 14,
    gap: 10,
  },

  infoLabel: {
    fontSize: 14,
    fontWeight: "500",
  },

  infoValue: {
    fontSize: 14,
    color: "#777",
  },

  reviewContainer: {
    paddingBottom: 12,
    marginBottom: 12,
  },

  reviewBorder: {
    borderBottomWidth: 1,
    borderBottomColor: "#eee",
  },

  reviewHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 6,
  },

  reviewName: {
    fontSize: 14,
    fontWeight: "600",
  },

  reviewComment: {
    fontSize: 14,
    color: "#555",
    marginBottom: 4,
  },

  reviewDate: {
    fontSize: 12,
    color: "#999",
  },
});
