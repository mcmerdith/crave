import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import { Href, Link } from "expo-router";

export default function BackButton({ href }: { href?: Href }) {
  return (
    <View>
      <Link href={href ?? "/(tabs)"} asChild>
        <TouchableOpacity style={styles.backButton}>
          <Text style={styles.backText}>← Back</Text>
        </TouchableOpacity>
      </Link>
    </View>
  );
}

const styles = StyleSheet.create({
  backButton: { marginBottom: 10 },
  backText: { fontSize: 18, color: "#555" },
});
