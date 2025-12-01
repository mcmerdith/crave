import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import { Link } from "expo-router";

export default function BackButton() {
  return (
    <View>
      <Link href="/(tabs)" asChild>
        <TouchableOpacity style={styles.backButton}>
          <Text style={styles.backText}>← Back</Text>
        </TouchableOpacity>
      </Link>
      ;
    </View>
  );
}

const styles = StyleSheet.create({
  backButton: { marginBottom: 10 },
  backText: { fontSize: 18, color: "#555" },
});
