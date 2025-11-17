// matches.tsx
import React from "react";
import { View, Text, FlatList, TouchableOpacity, StyleSheet, ScrollView } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Stack } from "expo-router";
import { Ionicons } from "@expo/vector-icons";
import Card, { CardProps } from "@/components/Card";
import { theme } from "../theme";

//example data for matches/liked resturaunts

const MatchedRestaurants: CardProps[] = [
  
  {
    name: "Taverna",
    cuisine: "Italian",
    rating: 4.8,
    distance: "0.5 mi",
    price: "$$",
    image:
      "https://vrconcierge.com/wp-content/uploads/2021/02/taverna-rustic-italian-newark-de-exterior-1-768x512.jpg",
  },
  {
    name: "El Diablo",
    cuisine: "Mexican",
    rating: 4.4,
    distance: "0.5 mi",
    price: "$",
    image:
      "https://images.squarespace-cdn.com/content/v1/58b57e8b2e69cffff969c6cd/1488299173082-81E2GCSB63YW66RKF8HO/Burrito_wood_retouched.jpg?format=1500w",
  },
  {
    name: "m2o Burger",
    cuisine: "American",
    rating: 4.9,
    distance: "0.5 mi",
    price: "$$",
    image:
    "https://media-cdn.grubhub.com/image/upload/d_search:browse-images:default.jpg/w_1200,q_auto,fl_lossy,dpr_auto,c_fill,f_auto,h_800,g_auto/wtisrayz07qylnbwba6e",
  },
];

//comment this line out to test the empty state
//const MatchedRestaurants: CardProps[] = []

export default function Matches() {
  const hasMatches = MatchedRestaurants.length > 0;

  return(
    <SafeAreaView style={styles.container}>
      <Stack.Screen
        options={{
          title: "Matches",
        }}
      />
      {hasMatches ? (
        <ScrollView showsVerticalScrollIndicator={false}
         contentContainerStyle={styles.scrollContent}
         >
        <Text style={styles.headerTitle}>Current Matches</Text>
        <Text style={styles.sectionSubtitle}>
          {MatchedRestaurants.length} saved restaurants
          </Text>

          <View style={styles.cardsGrid}>
            {MatchedRestaurants.map((item) => (
              <Card
                key={item.name}
                name={item.name}
                cuisine={item.cuisine}
                rating={item.rating}
                distance={item.distance}
                price={item.price}
                image={item.image}
              />
            ))}
          </View>
        </ScrollView>
        ) : (
        <View style={styles.emptyContainer}>
          <Text style={styles.heartEmoji}>💚</Text>
          <Text style={styles.emptyTitle}>No Recent Matches</Text>
          <Text style={styles.emptySubtitle}>
            Start swiping to save your favorite restaurants
          </Text>
        </View>
      )}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.colors.background,
    paddingHorizontal: 16,
    paddingTop: 20,
  },
  scrollContent: {
    paddingBottom: 40,
  },
  emptyContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  heartEmoji: {
    fontSize: 48,
    marginBottom: 16,
  },
  noMatchesTitle: {
    fontSize: 22,
    fontWeight: "600",
    marginBottom: 4,
    color: theme.colors.foreground,
  },
  noMatchesSubtitle: {
    fontSize: 14,
    color: theme.colors.mutedForeground,
    textAlign: "center",
    paddingHorizontal: 20,
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: "600",
    color: theme.colors.foreground,
    marginBottom: 4,
  },
  emptyTitle: {
    fontSize: 22,
    fontWeight: "600",
    marginBottom: 4,
    color: theme.colors.foreground,
  },
  emptySubtitle: {
    fontSize: 14,
    color: theme.colors.mutedForeground,
    textAlign: "center",
    paddingHorizontal: 20,
  },
  sectionSubtitle: {
    fontSize: 14,
    color: theme.colors.mutedForeground,
    marginBottom: 16,
  },
  cardsGrid: {
    flex: 1,
    flexWrap: "wrap",
    justifyContent: "space-between",
  },
});