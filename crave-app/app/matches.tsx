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
      "https://images.squarespace-cdn.com/content/v1/58b57e8b2e69cffff969c6cd/1488299173082-81E2GCSB63YW66RKF8HO/Burrito_wood_retouched.jpg?format=1500w",
  },
];

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
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
  },
});



/*
const RecentsData: CardProps[] = []; 


            <Text style={styles.headerTitle}>Current Matches</Text>
            <Text style={styles.headerSubtitle}>{LikedRestaurants.length} saved restaurants</Text>
          </View>
  )
  if (RecentsData.length === 0) {
    // No matches view
    return (
      <SafeAreaView style={[styles.container, { justifyContent: "center", alignItems: "center" }]}>
        <Text style={styles.heartEmoji}>💚</Text>
        <Text style={styles.noMatchesTitle}>No Recent Matches</Text>
        <Text style={styles.noMatchesSubtitle}>
          Start swiping to save your favorite restaurants
        </Text>

        <Stack.Screen
          options={{
            title: "Matches",
          }}
        />
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{ paddingBottom: 40 }}>
        {/* Header }
        <View style={styles.header}>
          <Text style={styles.headerTitle}>Current Matches</Text>
          <Text style={styles.headerSubtitle}>{RecentsData.length} saved restaurants</Text>
        </View>

        {/* Matches Grid }
        <FlatList
          data={RecentsData}
          numColumns={2}
          columnWrapperStyle={{ justifyContent: "space-between", marginBottom: 16 }}
          keyExtractor={(item) => item.name}
          renderItem={({ item }) => (
            <Card
              name={item.name}
              cuisine={item.cuisine}
              rating={item.rating}
              distance={item.distance}
              price={item.price}
              image={item.image}
            />
          )}
        />

        {/* Quick Actions/}
        <View style={styles.cardContainer}>
          <Text style={styles.sectionTitle}>Quick Actions</Text>
          <TouchableOpacity style={styles.actionButton}>
            <Text style={styles.actionText}>View all on map</Text>
            <Ionicons name="open-outline" size={18} color={theme.colors.foreground} />
          </TouchableOpacity>
          <TouchableOpacity style={styles.actionButton}>
            <Text style={styles.actionText}>Share with friends</Text>
            <Ionicons name="open-outline" size={18} color={theme.colors.foreground} />
          </TouchableOpacity>
        </View>

        {/* Stats }
        <View style={styles.cardContainer}>
          <Text style={styles.sectionTitle}>Your Stats</Text>
          <View style={styles.statsRow}>
            <View style={styles.statItem}>
              <Text style={styles.statNumber}>{RecentsData.length}</Text>
              <Text style={styles.statLabel}>Saved</Text>
            </View>
            <View style={styles.statItem}>
              <Text style={styles.statNumber}>12</Text>
              <Text style={styles.statLabel}>Visited</Text>
            </View>
            <View style={styles.statItem}>
              <Text style={styles.statNumber}>8</Text>
              <Text style={styles.statLabel}>Reviewed</Text>
            </View>
          </View>
        </View>
      </ScrollView>

      <Stack.Screen
        options={{
          title: "Matches",
        }}
      />
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
  header: {
    marginBottom: 16,
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: "600",
    color: theme.colors.foreground,
  },
  headerSubtitle: {
    fontSize: 14,
    color: theme.colors.mutedForeground,
  },
  cardContainer: {
    backgroundColor: theme.colors.card,
    borderRadius: theme.radius.lg,
    padding: 12,
    marginBottom: 16,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: "500",
    marginBottom: 12,
    color: theme.colors.foreground,
  },
  actionButton: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    backgroundColor: theme.colors.accent,
    padding: 12,
    borderRadius: theme.radius.md,
    marginBottom: 8,
  },
  actionText: {
    color: theme.colors.foreground,
    fontSize: 14,
  },
  statsRow: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  statItem: {
    alignItems: "center",
    flex: 1,
  },
  statNumber: {
    fontSize: 18,
    fontWeight: "600",
    color: theme.colors.foreground,
  },
  statLabel: {
    fontSize: 12,
    color: theme.colors.mutedForeground,
    marginTop: 2,
  },
});*/