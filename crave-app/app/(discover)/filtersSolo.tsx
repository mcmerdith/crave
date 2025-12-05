import React, { useState } from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import Slider from "@react-native-community/slider";
import ColorfulButton from "@/components/colorfulButton";
import { useRouter } from "expo-router";
import CloseButton from "@/components/closeButton";
import BackButton from "@/components/backButton";

const FiltersSolo = () => {
  const [priceRange, setPriceRange] = useState(2); // $-$$$$ scale
  const [distance, setDistance] = useState(10); // miles
  const router = useRouter();
  const priceLabels = ["$", "$$", "$$$", "$$$$"];

  return (
    <View style={{ flex: 1, backgroundColor: "#f9f9f9" }}>
      <View style={styles.container}>
        <BackButton />
        <Text style={styles.header}>Set Your Filters</Text>
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
          minimumTrackTintColor="#a542fb"
          maximumTrackTintColor="#ddd"
          thumbTintColor="#7b13ca"
          value={priceRange}
          onValueChange={setPriceRange}
        />

        {/* Distance Slider */}
        <Text style={styles.label}>Max Distance ({distance} mi)</Text>
        <Slider
          style={{ width: "100%", height: 40 }}
          minimumValue={1}
          maximumValue={50}
          step={1}
          minimumTrackTintColor="#f91671ff"
          maximumTrackTintColor="#ddd"
          thumbTintColor="#f91671ff"
          value={distance}
          onValueChange={setDistance}
        />

        {/* Apply Button */}
        <TouchableOpacity style={styles.applyButton}>
          <Text style={styles.applyText}>Apply Filters</Text>
        </TouchableOpacity>
      </View>
      {/* Start Swiping Button */}
      <View style={styles.swipeButtonContainer}>
        <ColorfulButton
          variant="solo"
          text="Start Swiping"
          enabled={true}
          onPress={() => {
            router.replace("/swipe/solo");
          }}
        />
      </View>
    </View>
  );
};

export default FiltersSolo;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: "#fff",
    paddingTop: 60,
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
    color: "#a542fb",
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
  swipeButtonContainer: {
    width: "100%",
    padding: 20,
    justifyContent: "flex-end",
  },
});
