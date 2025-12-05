import React from "react";
import {
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { User, Users } from "lucide-react-native";
import { theme } from "@/theme";
import { useRouter } from "expo-router";

export default function ModeSelection() {
  const router = useRouter();

  const handleStartSolo = () => {
    router.push("/(discover)/filtersSolo");
  };

  const handleStartGroup = () => {
    router.push("/groupLobby");
  };

  return (
    <View style={styles.wrapper}>
      <StatusBar barStyle="dark-content" />
      <View style={styles.container}>
        {/* Header */}
        <View style={styles.headerContainer}>
          <Text style={styles.headerTitle}>Discover</Text>
          <Text style={styles.headerSubtitle}>
            Find your next favorite spot
          </Text>
        </View>

        {/* Start Swiping Section */}
        <View style={styles.swipeSection}>
          <Text style={styles.sectionTitle}>Start Swiping</Text>
          <View style={styles.buttonRow}>
            {/* SOLO BUTTON */}
            <TouchableOpacity
              style={styles.buttonWrapper}
              onPress={handleStartSolo}
            >
              <LinearGradient
                colors={[theme.colors.purpleStart, theme.colors.purpleEnd]}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 1 }}
                style={styles.gradientButton}
              >
                <View style={styles.iconContainer}>
                  <User color="#fff" size={28} />
                </View>
                <Text style={styles.buttonTitle}>Solo</Text>
                <Text style={styles.buttonSubtitle}>Swipe on your own</Text>

                {/* Overlay gradient for subtle shading */}
                <LinearGradient
                  colors={["rgba(0,0,0,0.2)", "transparent"]}
                  style={styles.overlay}
                />
              </LinearGradient>
            </TouchableOpacity>

            {/* GROUP BUTTON */}
            <TouchableOpacity
              style={styles.buttonWrapper}
              onPress={handleStartGroup}
            >
              <LinearGradient
                colors={[theme.colors.orangeStart, theme.colors.orangeEnd]}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 1 }}
                style={styles.gradientButton}
              >
                <View style={styles.iconContainer}>
                  <Users color="#fff" size={28} />
                </View>
                <Text style={styles.buttonTitle}>Group</Text>
                <Text style={styles.buttonSubtitle}>Swipe with friends</Text>

                <LinearGradient
                  colors={["rgba(0,0,0,0.2)", "transparent"]}
                  style={styles.overlay}
                />
              </LinearGradient>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    display: "flex",
    flexDirection: "column",
    width: "100%",
    backgroundColor: theme.colors.background,
  },
  container: {
    display: "flex",
    flexDirection: "column",
    paddingHorizontal: 20,
    paddingTop: 20,
  },
  headerContainer: {
    marginBottom: 24,
  },
  headerTitle: {
    fontSize: 28,
    fontWeight: "600",
    color: theme.colors.foreground,
  },
  headerSubtitle: {
    color: "rgba(3, 2, 19, 0.6)",
    fontSize: 14,
    marginTop: 4,
  },
  swipeSection: {
    marginBottom: 16,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: "500",
    marginBottom: 12,
    color: theme.colors.foreground,
  },
  buttonRow: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  buttonWrapper: {
    width: "48%",
    height: 170,
    shadowRadius: 6,
    shadowOpacity: 0.15,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
  },
  gradientButton: {
    padding: 24,
    height: "100%",
    borderRadius: 20,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 6,
    elevation: 4,
    overflow: "hidden",
  },
  iconContainer: {
    backgroundColor: "rgba(255,255,255,0.25)",
    padding: 12,
    borderRadius: 40,
    marginBottom: 12,
    alignItems: "center",
    justifyContent: "center",
  },
  buttonTitle: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "600",
    marginBottom: 2,
  },
  buttonSubtitle: {
    color: "rgba(255,255,255,0.85)",
    fontSize: 14,
  },
  overlay: {
    ...StyleSheet.absoluteFillObject,
    borderRadius: 20,
  },
});
