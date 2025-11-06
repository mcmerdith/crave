// FiltersScreen.tsx
import React, { useState } from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import Slider from "@react-native-community/slider";

const FiltersScreen = () => {
  const [priceRange, setPriceRange] = useState(2); // $-$$$$ scale
  const [distance, setDistance] = useState(10); // miles

  const priceLabels = ["$", "$$", "$$$", "$$$$"];

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Filters</Text>

      {/* Price Slider */}
      <Text style={styles.label}>Price Range</Text>
      <View style={styles.priceLabels}>
        {priceLabels.map((label, index) => (
          <Text
            key={index}
            style={[
              styles.priceLabel,
              index === priceRange - 1 && styles.priceLabelActive,
            ]}
          >
            {label}
          </Text>
        ))}
      </View>
      <Slider
        style={{ width: "100%", height: 40 }}
        minimumValue={1}
        maximumValue={4}
        step={1}
        minimumTrackTintColor="#4CAF50"
        maximumTrackTintColor="#ddd"
        thumbTintColor="#4CAF50"
        value={priceRange}
        onValueChange={setPriceRange}
      />

      {/* Distance Slider */}
      <Text style={styles.label}>Distance ({distance} mi)</Text>
      <Slider
        style={{ width: "100%", height: 40 }}
        minimumValue={1}
        maximumValue={50}
        step={1}
        minimumTrackTintColor="#2196F3"
        maximumTrackTintColor="#ddd"
        thumbTintColor="#2196F3"
        value={distance}
        onValueChange={setDistance}
      />

      {/* Apply Button */}
      <TouchableOpacity style={styles.applyButton}>
        <Text style={styles.applyText}>Apply Filters</Text>
      </TouchableOpacity>
    </View>
  );
};

export default FiltersScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: "#fff",
  },
  header: {
    fontSize: 28,
    fontWeight: "bold",
    marginBottom: 30,
  },
  label: {
    fontSize: 18,
    fontWeight: "600",
    marginVertical: 10,
  },
  priceLabels: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 5,
  },
  priceLabel: {
    fontSize: 16,
    color: "#999",
  },
  priceLabelActive: {
    color: "#4CAF50",
    fontWeight: "bold",
  },
  applyButton: {
    marginTop: 40,
    backgroundColor: "#FF6347",
    paddingVertical: 15,
    borderRadius: 10,
    alignItems: "center",
  },
  applyText: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "bold",
  },
});
