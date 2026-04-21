import React from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
  ScrollView,
  Dimensions,
} from "react-native";
import Modal from "react-native-modal";
import { Ionicons } from "@expo/vector-icons";
import { RestaurantSwipeData } from "@/lib/places";


// Mock additional data
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
  visible: boolean;
  restaurant: RestaurantSwipeData | null;
  onClose: () => void;
}

const { height } = Dimensions.get("window");

const RestaurantDetailModal: React.FC<Props> = ({
    visible,
    restaurant,
    onClose,
  }) => {
    /*
    //const translateY = React.useRef(new Animated.Value(0)).current;
    //const scrollOffset = React.useRef(0);

    React.useEffect(() => {
      if (visible) {
        translateY.setValue(0);
      }
    }, [visible]);
    
    const panResponder = React.useRef(
      PanResponder.create({
        onMoveShouldSetPanResponder: (_, gestureState) => {
          return gestureState.dy > 5 && scrollOffset.current <= 0;
        },

        onPanResponderMove: (_, gestureState) => {
          if (gestureState.dy > 0) {
            translateY.setValue(gestureState.dy);
          }
        },

        onPanResponderRelease: (_, gestureState) => {
          if (gestureState.dy > 120 || gestureState.vy > 1.5) {
            Animated.timing(translateY, {
              toValue: height,
              duration: 200,
              useNativeDriver: true,
            }).start(() => onClose());
          } else {
            Animated.spring(translateY, {
              toValue: 0,
              useNativeDriver: true,
            }).start();
          }
        },
      })
    ).current;
  */
  if (!restaurant) return null;
  
  return (
    <Modal
      isVisible={visible}
      onBackdropPress={onClose}
      swipeDirection="down"
      onSwipeComplete={onClose}
      style={styles.modalWrapper}
    >
      <View style={styles.modalContent}>
        <ScrollView contentContainerStyle={styles.content}>
          {/* Close button */}
          <TouchableOpacity style={styles.closeButton} onPress={onClose}>
            <Ionicons name="close" size={28} color="#000" />
          </TouchableOpacity>

            {/* Image */}
            <Image
              source={{
                uri:
                  restaurant.image ||
                  "https://placehold.co/600x600/?text=No+Image",
              }}
              style={styles.image}
              resizeMode="cover"
            />

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
              {restaurant.price && <Text style={styles.price}>{restaurant.price}</Text>}
            </View>

            {/* Placeholder info */}
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
        </View>
      </Modal>
    );
  };

const styles = StyleSheet.create({
  modalWrapper: {
    justifyContent: "flex-end",
    margin: 0,
  },

  modalContent: {
    height: "85%",
    backgroundColor: "#fff",
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
    overflow: "hidden",
  },
  content: {
    padding: 16,
    paddingBottom: 40,
  },
  closeButton: {
    position: "absolute",
    top: 16,
    right: 16,
    zIndex: 10,
  },
  image: {
    width: "100%",
    height: 200,
    borderRadius: 16,
    marginBottom: 16,
  },
  name: {
    fontSize: 22,
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
    marginBottom: 12,
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

export default RestaurantDetailModal;