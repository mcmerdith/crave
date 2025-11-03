import React from "react";
import { View, Text, TouchableOpacity, StyleSheet, SafeAreaView, StatusBar } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { User, Users } from "lucide-react-native"; 
import { theme } from "../theme";

export default function HomeScreen() {
  const handleStartSolo = () => {
    console.log("Solo mode started");
  };

  const handleStartGroup = () => {
    console.log("Group mode started");
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar barStyle="dark-content" />
      <View style={styles.container}>
        <Text style={styles.header}>Start Swiping</Text>
        <View style={styles.buttonRow}>
          {/* Solo Button */}
          <TouchableOpacity style={styles.buttonWrapper} onPress={handleStartSolo}>
            <LinearGradient
              colors={[theme.colors.purpleStart, theme.colors.purpleEnd]}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 1 }}
              style={styles.button}
            >
              <Text style={styles.buttonTitle}>Solo</Text>
              <Text style={styles.buttonSubtitle}>Swipe on your own</Text>
            </LinearGradient>
          </TouchableOpacity>

          {/* Group Button */}
          <TouchableOpacity style={styles.buttonWrapper} onPress={handleStartGroup}>
            <LinearGradient
              colors={[theme.colors.orangeStart, theme.colors.orangeEnd]}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 1 }}
              style={styles.button}
            >
              <Text style={styles.buttonTitle}>Group</Text>
              <Text style={styles.buttonSubtitle}>Swipe with friends</Text>
            </LinearGradient>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: { flex: 1, backgroundColor: theme.colors.background },
  container: { padding: 20 },
  header: { fontSize: 24, fontWeight: "500", marginBottom: 20, color: theme.colors.foreground },
  buttonRow: { flexDirection: "row", justifyContent: "space-between", gap: 12 },
  buttonWrapper: { flex: 1, marginHorizontal: 6 },
  button: {
    padding: 20,
    borderRadius: 20,
    alignItems: "flex-start",
    justifyContent: "center",
  },
  buttonTitle: { color: "#fff", fontSize: 18, fontWeight: "500", marginBottom: 4 },
  buttonSubtitle: { color: "rgba(255,255,255,0.8)", fontSize: 14 },
});
