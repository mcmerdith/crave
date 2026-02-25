import React from "react";
import { FlatList, StyleSheet, Text, View, TouchableOpacity } from "react-native";
import Card from "./Card";
import { RestaurantSwipeData, skeletonPlacesData } from "@/lib/places";

interface CarouselProps {
  title: string;
  data?: RestaurantSwipeData[];
  onViewAll?: () => void;
  onItemPress?: (restaurant: RestaurantSwipeData) => void;
}

const Carousel: React.FC<CarouselProps> = ({
  title,
  data,
  onViewAll,
  onItemPress,
}) => {
  const renderData = data ?? skeletonPlacesData();

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.heading}>{title}</Text>
      </View>

      <FlatList
        data={renderData}
        renderItem={({ item }) => (
          <TouchableOpacity
            activeOpacity={0.9}
            onPress={() => onItemPress?.(item)}
          >
            <Card {...item} />
          </TouchableOpacity>
        )}
        keyExtractor={(item) => item.id}
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={{
          paddingHorizontal: 16,
          paddingVertical: 10,
        }}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginTop: 20,
    height: 250,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginHorizontal: 16,
    marginBottom: 8,
  },
  heading: {
    fontSize: 18,
    fontWeight: "600",
  },
  viewAll: {
    color: "#007AFF",
    fontSize: 14,
  },
});

export default Carousel;
