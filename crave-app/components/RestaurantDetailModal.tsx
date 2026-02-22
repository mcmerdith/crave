import React from "react";
import {
  Modal,
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
} from "react-native";
import { RestaurantSwipeData } from "@/lib/places";

interface Props {
  visible: boolean;
  restaurant: RestaurantSwipeData | null;
  onClose: () => void;
}

const RestaurantDetailModal: React.FC<Props> = ({
  visible,
  restaurant,
  onClose,
}) => {
  if (!restaurant) return null;

  return (
    <Modal visible={visible} animationType="slide" transparent>
      <View style={styles.overlay}>
        <View style={styles.modal}>
          <TouchableOpacity onPress={onClose} style={styles.closeBtn}>
            <Text style={{ fontWeight: "600" }}>Close</Text>
          </TouchableOpacity>

          <Image
            source={{ uri: restaurant.image }}
            style={styles.image}
          />

          <Text style={styles.title}>{restaurant.name}</Text>
          <Text style={styles.subtitle}>{restaurant.cuisine}</Text>
          <Text>⭐ {restaurant.rating}</Text>
          <Text>{restaurant.distance}</Text>
          <Text>{restaurant.price}</Text>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.5)",
    justifyContent: "flex-end",
  },
  modal: {
    backgroundColor: "white",
    padding: 20,
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
  },
  closeBtn: {
    alignSelf: "flex-end",
    marginBottom: 10,
  },
  image: {
    width: "100%",
    height: 200,
    borderRadius: 16,
    marginBottom: 12,
  },
  title: {
    fontSize: 20,
    fontWeight: "700",
  },
  subtitle: {
    color: "#777",
    marginBottom: 10,
  },
});

export default RestaurantDetailModal;