import React from "react";
import { ScrollView, StyleSheet, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Stack } from "expo-router";
import Card from "@/components/Card";
import { theme } from "../../theme";
import { useLocationContext } from "@/lib/context";
import { useQuery } from "@tanstack/react-query";
import { trpc } from "@/lib/trpc";
import { skeletonPlacesData, transformPlacesApiData } from "@/lib/places";

export default function Matches() {
  const { location } = useLocationContext();
  const { data: places } = useQuery(
    trpc.places.search.queryOptions({
      center: location.coordinate ?? undefined,
    }),
  );
  const matches = (
    transformPlacesApiData(places) ?? skeletonPlacesData()
  ).slice(0, 4);
  const hasMatches = matches.length > 0;

  return (
    <SafeAreaView style={styles.container}>
      <Stack.Screen
        options={{
          title: "Matches",
        }}
      />
      {hasMatches ? (
        <ScrollView
          showsVerticalScrollIndicator={false}
          contentContainerStyle={styles.scrollContent}
        >
          <Text style={styles.headerTitle}>Current Matches</Text>
          <Text style={styles.sectionSubtitle}>
            {matches.length} saved restaurants
          </Text>

          <View style={styles.cardsGrid}>
            {matches.map((item) => (
              <View key={item.id} style={styles.cardWrapper}>
                <Card {...item} />
              </View>
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
  cardWrapper: {
    width: "48%",
    marginBottom: 16,
  },
});
