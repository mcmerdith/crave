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

// Mock data (same as your modal)
const hours = "11:00 AM - 10:00 PM";
const phone = "(555) 123-4567";

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

export default function RestaurantCard({
  restaurant,
}: {
  restaurant: RestaurantSwipeData;
}) {
  const [imgError, setImgError] = useState(false);
  const [isFlipped, setIsFlipped] = useState(false);
  const flipAnimation = useRef(new Animated.Value(0)).current;

  const useLocal = imgError || !isValidImage(restaurant.image);

  const flipCard = () => {
    const toValue = isFlipped ? 0 : 180;
    
    Animated.spring(flipAnimation, {
      toValue,
      friction: 8,
      tension: 10,
      useNativeDriver: true,
    }).start();
    
    setIsFlipped(!isFlipped);
  };

  const frontInterpolate = flipAnimation.interpolate({
    inputRange: [0, 180],
    outputRange: ['0deg', '180deg'],
  });

  const backInterpolate = flipAnimation.interpolate({
    inputRange: [0, 180],
    outputRange: ['180deg', '360deg'],
  });

  const frontOpacity = flipAnimation.interpolate({
    inputRange: [0, 90, 90.01, 180],
    outputRange: [1, 1, 0, 0],
  });

  const backOpacity = flipAnimation.interpolate({
    inputRange: [0, 90, 90.01, 180],
    outputRange: [0, 0, 1, 1],
  });

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
    <TouchableOpacity 
      activeOpacity={0.9} 
      onPress={flipCard}
      style={styles.cardContainer}
    >
      {/* Front of card */}
      <Animated.View
        style={[
          styles.card,
          {
            transform: [{ rotateY: frontInterpolate }],
            opacity: frontOpacity,
          },
        ]}
      >
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

        <View style={styles.infoBlock}>
          <Text style={styles.title} numberOfLines={1}>
            {restaurant.name}
          </Text>
          <Text style={styles.subtitle}>
            {restaurant.cuisine} • {restaurant.price} • ⭐ {restaurant.rating}
          </Text>
          <Text style={styles.distance}>{restaurant.distance} away</Text>
          
          <View style={styles.tapHint}>
            <Ionicons name="information-circle-outline" size={16} color="#6C47FF" />
            <Text style={styles.tapHintText}>Tap for details</Text>
          </View>
        </View>
      </Animated.View>

      {/* Back of card */}
      <Animated.View
        style={[
          styles.card,
          styles.cardBack,
          {
            transform: [{ rotateY: backInterpolate }],
            opacity: backOpacity,
          },
        ]}
      >
        <ScrollView 
          contentContainerStyle={styles.backContent}
          showsVerticalScrollIndicator={false}
        >
          {/* Close/Back button */}
          <TouchableOpacity style={styles.backButton} onPress={flipCard}>
            <Ionicons name="arrow-back" size={24} color="#000" />
          </TouchableOpacity>

          {/* Small image */}
          {isValidImage(restaurant.image) ? (
            <Image
              source={{ uri: restaurant.image }}
              style={styles.backImage}
              resizeMode="cover"
            />
          ) : (
            <View style={styles.backImageFallback}>
              <Image
                source={require("@/assets/images/white_burger_transparent.png")}
                style={styles.backFallbackBurger}
                resizeMode="contain"
              />
            </View>
          )}

          {/* Name & Cuisine */}
          <Text style={styles.backName}>{restaurant.name}</Text>
          <Text style={styles.backCuisine}>{restaurant.cuisine}</Text>

          {/* Rating / Distance / Price */}
          <View style={styles.backInfoRow}>
            {restaurant.rating && (
              <View style={styles.backInfoItem}>
                <Ionicons name="star" size={16} color="#F6BE00" />
                <Text style={styles.backInfoText}>{restaurant.rating}</Text>
              </View>
            )}
            {restaurant.distance && (
              <View style={styles.backInfoItem}>
                <Ionicons name="location-outline" size={16} color="#777" />
                <Text style={styles.backInfoText}>{restaurant.distance}</Text>
              </View>
            )}
            {restaurant.price && <Text style={styles.backPrice}>{restaurant.price}</Text>}
          </View>

          {/* Features */}
          {features.length > 0 && (
            <View style={styles.featuresRow}>
              {features.map((feature, index) => (
                <View key={index} style={styles.featureBadge}>
                  <Ionicons name={feature.icon as any} size={12} color="#6C47FF" />
                  <Text style={styles.featureText}>{feature.label}</Text>
                </View>
              ))}
            </View>
          )}

          {/* Contact & Hours */}
          <View style={styles.backCard}>
            <Text style={styles.sectionTitle}>Contact & Hours</Text>

            <View style={styles.infoRowLarge}>
              <Ionicons name="time-outline" size={16} color="#777" />
              <View>
                <Text style={styles.infoLabel}>Open Today</Text>
                <Text style={styles.infoValue}>{hours}</Text>
              </View>
            </View>

            <View style={styles.infoRowLarge}>
              <Ionicons name="call-outline" size={16} color="#777" />
              <Text style={styles.infoValue}>{phone}</Text>
            </View>

            {restaurant.websiteUri && (
              <View style={styles.infoRowLarge}>
                <Ionicons name="globe-outline" size={16} color="#777" />
                <TouchableOpacity onPress={() => Linking.openURL(restaurant.websiteUri!)}>
                  <Text style={[styles.infoValue, { color: "#6C47FF" }]}>
                    {restaurant.websiteUri
                      .replace(/^https?:\/\//, "")
                      .replace(/\/$/, "")}
                  </Text>
                </TouchableOpacity>
              </View>
            )}

            <View style={styles.infoRowLarge}>
              <Ionicons name="location-outline" size={16} color="#777" />
              <TouchableOpacity onPress={() => Linking.openURL(restaurant.detailsUri!)}>
                <Text style={[styles.infoValue, { color: "#6C47FF" }]}>
                  {restaurant.address ?? "View on Google Maps"}
                </Text>
              </TouchableOpacity>
            </View>
          </View>

          {/* Reviews */}
          <View style={styles.backCard}>
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
                        size={12}
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
      </Animated.View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  cardContainer: {
    width: "100%",
    height: 400,
  },
  card: {
    position: "absolute",
    width: "100%",
    height: 400,
    borderRadius: 15,
    overflow: "hidden",
    backgroundColor: "white",
    backfaceVisibility: "hidden",
  },
  cardBack: {
    backgroundColor: "#fff",
  },
  imageContainer: {
    width: "100%",
    height: 268,
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
    width: 150,
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
    height: 132,
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
  tapHint: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 8,
    gap: 4,
  },
  tapHintText: {
    fontSize: 12,
    color: "#6C47FF",
    fontWeight: "500",
  },
  
  // Back of card styles
  backContent: {
    padding: 12,
    paddingBottom: 20,
  },
  backButton: {
    alignSelf: "flex-start",
    padding: 8,
    marginBottom: 8,
  },
  backImage: {
    width: "100%",
    height: 120,
    borderRadius: 12,
    marginBottom: 12,
  },
  backImageFallback: {
    width: "100%",
    height: 120,
    borderRadius: 12,
    marginBottom: 12,
    backgroundColor: "#d9d9d9",
    justifyContent: "center",
    alignItems: "center",
  },
  backFallbackBurger: {
    width: 60,
    height: 60,
  },
  backName: {
    fontSize: 18,
    fontWeight: "700",
    marginBottom: 4,
  },
  backCuisine: {
    fontSize: 14,
    color: "#777",
    marginBottom: 8,
  },
  backInfoRow: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 10,
  },
  backInfoItem: {
    flexDirection: "row",
    alignItems: "center",
    marginRight: 12,
  },
  backInfoText: {
    fontSize: 13,
    color: "#555",
    marginLeft: 4,
  },
  backPrice: {
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
  backCard: {
    backgroundColor: "#fff",
    borderRadius: 12,
    padding: 12,
    marginTop: 10,
    shadowColor: "#000",
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 2,
  },
  sectionTitle: {
    fontSize: 15,
    fontWeight: "600",
    marginBottom: 10,
  },
  infoRowLarge: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 10,
    gap: 8,
  },
  infoLabel: {
    fontSize: 12,
    fontWeight: "500",
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
    marginBottom: 4,
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