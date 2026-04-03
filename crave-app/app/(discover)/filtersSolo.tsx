import BackButton from "@/components/backButton";
import ColorfulButton from "@/components/colorfulButton";
import { Ionicons } from "@expo/vector-icons";
import Slider from "@react-native-community/slider";
import { useRouter } from "expo-router";
import React, { useState } from "react";
import {
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

const FiltersSolo = () => {
  //const [priceRange, setPriceRange] = useState(2); // $-$$$$ scale
  //const [distance, setDistance] = useState(10); // miles
  const router = useRouter();
  //const priceLabels = ["$", "$$", "$$$", "$$$$"];

  const [distance, setDistance] = useState(5);
  const [priceRange, setPriceRange] = useState(2);

  return (
    <View style={{ flex: 1, backgroundColor: "white" }}>
      <ScrollView contentContainerStyle={{ padding: 20, paddingTop: 60 }}>
        <BackButton />

        <Text style={styles.header}>Set Your Filters</Text>
        <Text style={styles.subHeader}>Customize your preferences</Text>

        {/* Price Range Slider */}
        <View style={styles.card}>
          <View style={styles.cardHeader}>
            <View style={styles.iconContainer}>
              <Ionicons name="cash-outline" size={18} color="#000" />
            </View>
            <Text style={[styles.cardTitle, { marginLeft: 10 }]}>
              Price Range
            </Text>
          </View>

          <View style={styles.priceGrid}>
            {["$", "$$", "$$$", "$$$$"].map((price, index) => (
              <TouchableOpacity
                key={price}
                onPress={() => setPriceRange(index + 1)}
                style={[
                  styles.priceButton,
                  priceRange === index + 1 && styles.priceButtonActive,
                ]}
              >
                <Text
                  style={[
                    styles.priceText,
                    priceRange === index + 1 && styles.priceTextActive,
                  ]}
                >
                  {price}
                </Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>

        {/* Distance Card */}
        <View style={styles.card}>
          <View style={styles.cardHeader}>
            <View style={styles.iconContainer}>
              <Ionicons name="location-outline" size={18} color="#000" />
            </View>
            <View style={{ marginLeft: 10 }}>
              <Text style={styles.cardTitle}>Distance</Text>
              <Text style={styles.cardSubtitle}>Up to {distance} miles</Text>
            </View>
          </View>

          <Slider
            minimumValue={1}
            maximumValue={25}
            step={1}
            value={distance}
            onValueChange={setDistance}
            minimumTrackTintColor="#a542fb"
            maximumTrackTintColor="#ddd"
            thumbTintColor="#7b13ca"
          />

          <View style={styles.sliderLabels}>
            <Text style={styles.smallText}>1 mi</Text>
            <Text style={styles.smallText}>25 mi</Text>
          </View>
        </View>

        {/* Apply Button */}
        <View style={{ marginTop: 30 }}>
          <ColorfulButton
            variant="solo"
            text="Apply Filters"
            enabled={true}
            onPress={() => router.replace("/swipe/solo")}
          />
        </View>
      </ScrollView>
    </View>
  );
};

export default FiltersSolo;

const styles = StyleSheet.create({
  header: {
    fontSize: 28,
    fontWeight: "bold",
  },
  subHeader: {
    color: "#666",
    marginBottom: 25,
  },
  card: {
    backgroundColor: "#fff",
    borderRadius: 18,
    padding: 18,
    marginBottom: 20,
    shadowColor: "#000",
    shadowOpacity: 0.05,
    shadowRadius: 10,
    elevation: 3,
  },
  cardHeader: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 15,
  },
  iconContainer: {
    backgroundColor: "#eee",
    padding: 8,
    borderRadius: 10,
  },
  cardTitle: {
    fontSize: 16,
    fontWeight: "600",
  },
  cardSubtitle: {
    fontSize: 13,
    color: "#777",
  },
  sliderLabels: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 5,
  },
  smallText: {
    fontSize: 12,
    color: "#888",
  },
  priceGrid: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 10,
  },
  priceButton: {
    flex: 1,
    paddingVertical: 12,
    marginHorizontal: 5,
    borderRadius: 14,
    borderWidth: 2,
    borderColor: "#ddd",
    alignItems: "center",
  },
  priceButtonActive: {
    borderColor: "#a542fb",
    backgroundColor: "rgba(165,66,251,0.1)",
  },
  priceText: {
    fontWeight: "600",
    color: "#777",
  },
  priceTextActive: {
    color: "#a542fb",
  },
});
