import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import { Link } from "expo-router";
import { theme } from "@/theme";

export default function SessionComplete() {
  return (
    <View style={styles.container}>
      <Text style={styles.message}>Here&apos;s your matches!</Text>

      <Link href="/(tabs)" asChild>
        <TouchableOpacity style={styles.linkButton}>
          <Text style={styles.linkText}>Go to Discover</Text>
        </TouchableOpacity>
      </Link>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    padding: 20,
  },
  message: {
    fontSize: 18,
    marginBottom: 20,
  },
  linkButton: {
    paddingVertical: 12,
    paddingHorizontal: 25,
    borderRadius: 8,
  },
  linkText: {
    color: theme.colors.black,
    fontSize: 16,
    fontWeight: "500",
  },
});
