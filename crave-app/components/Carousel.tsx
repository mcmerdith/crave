import React from "react";
import { View, Text, FlatList, StyleSheet } from "react-native";
import Card, { CardProps } from "./Card";

interface CarouselProps {
  title: string;
  data: CardProps[];
  onViewAll?: () => void;
}

const Carousel: React.FC<CarouselProps> = ({ title, data, onViewAll }) => {
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.heading}>{title}</Text>
        {/* <Text style={styles.viewAll} onPress={onViewAll}>
          View All
        </Text> */}
      </View>

      <FlatList
        data={data}
        renderItem={({ item }) => <Card {...item} />}
        keyExtractor={(item) => item.id}
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={{ paddingHorizontal: 16 }}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginTop: 20,
    height: 220,
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
