import React, { useState, useRef } from "react";
import {
  View,
  Text,
  Image,
  StyleSheet,
  TouchableOpacity,
  Animated,
  ScrollView,
  Linking,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
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

const hours = "11:00 AM - 10:00 PM";
const phone = "(555) 123-4567";

const reviews = [
  { name: "Sarah M.", rating: 5, comment: "Amazing food and great atmosphere!", date: "2 days ago" },
  { name: "John D.", rating: 4, comment: "Delicious! Will definitely come back.", date: "1 week ago" },
  { name: "Emily R.", rating: 5, comment: "Best in the area. Highly recommend!", date: "2 weeks ago" },
];

const DRAWER_HEIGHT = 320;

export default function RestaurantCard({ restaurant }: { restaurant: RestaurantSwipeData }) {
  const [imgError, setImgError] = useState(false);
  const [drawerOpen, setDrawerOpen] = useState(false);
  const drawerAnim = useRef(new Animated.Value(DRAWER_HEIGHT)).current; // starts off-screen (below)

  if (!restaurant) return null;

  const shouldUseFallback = imgError || !isValidImage(restaurant.image);

  const openDrawer = () => {
    setDrawerOpen(true);
    Animated.spring(drawerAnim, {
      toValue: 0,
      friction: 9,
      tension: 60,
      useNativeDriver: true,
    }).start();
  };

  const closeDrawer = () => {
    Animated.spring(drawerAnim, {
      toValue: DRAWER_HEIGHT,
      friction: 9,
      tension: 60,
      useNativeDriver: true,
    }).start(() => setDrawerOpen(false));
  };

  const features = [
    { label: "Curbside Pickup", value: restaurant.curbsidePickup, icon: "car-outline" },
    { label: "Delivery", value: restaurant.delivery, icon: "bicycle-outline" },
    { label: "Good for Groups", value: restaurant.goodForGroups, icon: "people-outline" },
    { label: "Good for Kids", value: restaurant.goodForChildren, icon: "happy-outline" },
    { label: "Watch Sports", value: restaurant.goodForWatchingSports, icon: "tv-outline" },
    { label: "Outdoor Seating", value: restaurant.outdoorSeating, icon: "sunny-outline" },
    { label: "Live Music", value: restaurant.liveMusic, icon: "musical-notes-outline" },
  ].filter((f) => f.value === true);

  return (
    // ✅ Plain View — no TouchableOpacity, so swipe gestures reach the parent swiper
    <View style={styles.cardContainer}>

      {/* Card image */}
      <View style={styles.imageContainer}>
        {shouldUseFallback ? (
          <ImageFallback />
        ) : (
          <Image
            source={{ uri: restaurant.image }}
            onError={() => setImgError(true)}
            style={styles.image}
            resizeMode="cover"
          />
        )}

        {/* Info button — only touchable element on the front */}
        <TouchableOpacity
          style={styles.infoButton}
          onPress={openDrawer}
          activeOpacity={0.8}
        >
          <Ionicons name="information-circle" size={32} color="#fff" />
        </TouchableOpacity>
      </View>

      {/* Card info strip */}
      <View style={styles.infoBlock}>
        <Text style={styles.title} numberOfLines={1}>{restaurant.name}</Text>
        <Text style={styles.subtitle}>
          {restaurant.cuisine} • {restaurant.price} • ⭐ {restaurant.rating}
        </Text>
        <Text style={styles.distance}>{restaurant.distance} away</Text>
      </View>

      {/* Drawer — slides up over the card from the bottom */}
      {drawerOpen && (
        <Animated.View
          style={[
            styles.drawer,
            { transform: [{ translateY: drawerAnim }] },
          ]}
        >
          {/* Drag handle + close */}
          <View style={styles.drawerHeader}>
            <View style={styles.drawerHandle} />
            <TouchableOpacity onPress={closeDrawer} style={styles.closeButton}>
              <Ionicons name="close" size={22} color="#444" />
            </TouchableOpacity>
          </View>

          <ScrollView
            showsVerticalScrollIndicator={false}
            contentContainerStyle={styles.drawerContent}
            // ✅ Prevents vertical scroll from being stolen by horizontal swiper
            scrollEventThrottle={16}
          >
            {/* Name & quick info */}
            <Text style={styles.drawerName}>{restaurant.name}</Text>
            <Text style={styles.drawerCuisine}>{restaurant.cuisine}</Text>

            <View style={styles.drawerInfoRow}>
              {restaurant.rating && (
                <View style={styles.drawerInfoItem}>
                  <Ionicons name="star" size={15} color="#F6BE00" />
                  <Text style={styles.drawerInfoText}>{restaurant.rating}</Text>
                </View>
              )}
              {restaurant.distance && (
                <View style={styles.drawerInfoItem}>
                  <Ionicons name="location-outline" size={15} color="#777" />
                  <Text style={styles.drawerInfoText}>{restaurant.distance}</Text>
                </View>
              )}
              {restaurant.price && (
                <Text style={styles.drawerInfoText}>{restaurant.price}</Text>
              )}
            </View>

            {/* Feature badges */}
            {features.length > 0 && (
              <View style={styles.featuresRow}>
                {features.map((feature, index) => (
                  <View key={index} style={styles.featureBadge}>
                    <Ionicons name={feature.icon as any} size={11} color="#6C47FF" />
                    <Text style={styles.featureText}>{feature.label}</Text>
                  </View>
                ))}
              </View>
            )}

            {/* Contact & Hours */}
            <View style={styles.section}>
              <Text style={styles.sectionTitle}>Contact & Hours</Text>

              <View style={styles.infoRowLarge}>
                <Ionicons name="time-outline" size={15} color="#777" />
                <View>
                  <Text style={styles.infoLabel}>Open Today</Text>
                  <Text style={styles.infoValue}>{hours}</Text>
                </View>
              </View>

              <View style={styles.infoRowLarge}>
                <Ionicons name="call-outline" size={15} color="#777" />
                <Text style={styles.infoValue}>{phone}</Text>
              </View>

              {restaurant.websiteUri && (
                <View style={styles.infoRowLarge}>
                  <Ionicons name="globe-outline" size={15} color="#777" />
                  <TouchableOpacity onPress={() => Linking.openURL(restaurant.websiteUri!)}>
                    <Text style={[styles.infoValue, { color: "#6C47FF" }]}>
                      {restaurant.websiteUri.replace(/^https?:\/\//, "").replace(/\/$/, "")}
                    </Text>
                  </TouchableOpacity>
                </View>
              )}

              <View style={styles.infoRowLarge}>
                <Ionicons name="location-outline" size={15} color="#777" />
                <TouchableOpacity onPress={() => Linking.openURL(restaurant.detailsUri!)}>
                  <Text style={[styles.infoValue, { color: "#6C47FF" }]}>
                    {restaurant.address ?? "View on Google Maps"}
                  </Text>
                </TouchableOpacity>
              </View>
            </View>

            {/* Reviews */}
            <View style={styles.section}>
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
                        <Ionicons key={i} name="star" size={11} color="#F6BE00" style={{ marginLeft: 2 }} />
                      ))}
                    </View>
                  </View>
                  <Text style={styles.reviewComment}>{review.comment}</Text>
                  <Text style={styles.reviewDate}>{review.date}</Text>
                </View>
              ))}
            </View>
          </ScrollView>
        </Animated.View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  cardContainer: {
    width: "100%",
    height: 400,
    borderRadius: 15,
    overflow: "hidden",
    backgroundColor: "white",
  },
  imageContainer: {
    width: "100%",
    height: 268,
    overflow: "hidden",
    position: "relative",
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
    width: 150,
    height: 150,
  },
  fallbackText: {
    fontFamily: "Nunito",
    fontSize: 20,
    color: "#ffffff",
    marginTop: 4,
  },
  infoButton: {
    position: "absolute",
    top: 12,
    right: 12,
    backgroundColor: "rgba(0,0,0,0.45)",
    borderRadius: 20,
    width: 40,
    height: 40,
    justifyContent: "center",
    alignItems: "center",
  },
  infoBlock: {
    width: "100%",
    height: 132,
    padding: 16,
    backgroundColor: "white",
    justifyContent: "center",
  },
  title: {
    fontSize: 22,
    fontWeight: "bold",
    color: "black",
    flexShrink: 1,
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

  // Drawer
  drawer: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    height: DRAWER_HEIGHT,
    backgroundColor: "#fff",
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    shadowColor: "#000",
    shadowOpacity: 0.15,
    shadowRadius: 10,
    elevation: 8,
  },
  drawerHeader: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    paddingTop: 10,
    paddingHorizontal: 12,
    marginBottom: 4,
  },
  drawerHandle: {
    width: 36,
    height: 4,
    borderRadius: 2,
    backgroundColor: "#ddd",
    flex: 1,
    alignSelf: "center",
    marginLeft: 34, // offset to visually center under the close button
  },
  closeButton: {
    padding: 6,
  },
  drawerContent: {
    paddingHorizontal: 16,
    paddingBottom: 16,
  },
  drawerName: {
    fontSize: 17,
    fontWeight: "700",
    marginBottom: 2,
  },
  drawerCuisine: {
    fontSize: 13,
    color: "#777",
    marginBottom: 8,
  },
  drawerInfoRow: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 10,
    gap: 12,
  },
  drawerInfoItem: {
    flexDirection: "row",
    alignItems: "center",
    gap: 4,
  },
  drawerInfoText: {
    fontSize: 13,
    color: "#555",
  },
  featuresRow: {
    flexDirection: "row",
    flexWrap: "wrap",
    marginBottom: 10,
  },
  featureBadge: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#F4F1FF",
    borderRadius: 10,
    paddingHorizontal: 8,
    paddingVertical: 4,
    marginRight: 6,
    marginBottom: 6,
  },
  featureText: {
    fontSize: 10,
    color: "#6C47FF",
    marginLeft: 4,
    fontWeight: "500",
  },
  section: {
    marginTop: 12,
    paddingTop: 12,
    borderTopWidth: 1,
    borderTopColor: "#f0f0f0",
  },
  sectionTitle: {
    fontSize: 14,
    fontWeight: "600",
    marginBottom: 10,
  },
  infoRowLarge: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 8,
    gap: 8,
  },
  infoLabel: {
    fontSize: 11,
    fontWeight: "500",
    color: "#444",
  },
  infoValue: {
    fontSize: 12,
    color: "#777",
  },
  reviewContainer: {
    paddingBottom: 8,
    marginBottom: 8,
  },
  reviewBorder: {
    borderBottomWidth: 1,
    borderBottomColor: "#eee",
  },
  reviewHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 3,
  },
  reviewName: {
    fontSize: 12,
    fontWeight: "600",
  },
  reviewComment: {
    fontSize: 12,
    color: "#555",
    marginBottom: 3,
  },
  reviewDate: {
    fontSize: 10,
    color: "#999",
  },
});