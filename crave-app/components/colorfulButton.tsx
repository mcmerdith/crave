import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { Ionicons } from "@expo/vector-icons";

interface StartSwipingButtonProps {
  canStart: boolean;
  onPress: () => void;
  text?: string;
  variant?: "solo" | "group" | "other";
}

// Gradient colors for each variant
const variants: Record<"solo" | "group" | "other", [string, string]> = {
  group: ["#FF8A00", "#E92E7F"],
  solo: ["#8A2BE2", "#4B0082"],
  other: ["#b9bcc6ff", "#969a9eff"],
};

export default function ColorfulButton({
  canStart,
  onPress,
  text = "Start",
  variant = "solo",
}: StartSwipingButtonProps) {
  const activeColors = variants[variant];
  const disabledColors: [string, string] = ["#e2e2e2", "#cfcfcf"];

  return (
    <View style={styles.container}>
      <TouchableOpacity
        disabled={!canStart}
        onPress={onPress}
        style={{ width: "100%" }}
      >
        <LinearGradient
          colors={canStart ? activeColors : disabledColors}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
          style={[styles.button, { opacity: canStart ? 1 : 0.6 }]}
        >
          <Ionicons
            name="play-circle-outline"
            size={22}
            color={canStart ? "#fff" : "#666"}
          />

          <Text style={[styles.text, { color: canStart ? "#fff" : "#666" }]}>
            {text}
          </Text>
        </LinearGradient>
      </TouchableOpacity>

      {!canStart && (
        <Text style={styles.waitingText}>Waiting for friends to join...</Text>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginTop: 25,
    width: "100%",
    alignItems: "center",
  },
  button: {
    width: "100%",
    paddingVertical: 15,
    borderRadius: 40,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    gap: 8,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowRadius: 8,
    shadowOffset: { width: 0, height: 4 },
  },
  text: {
    fontSize: 17,
    fontWeight: "600",
    alignSelf: "center",
  },
  waitingText: {
    marginTop: 6,
    color: "#777",
    fontSize: 14,
  },
  centerTextContainer: {
    position: "absolute",
    left: 0,
    right: 0,
    alignItems: "center",
    justifyContent: "center",
  },

  leftIconContainer: {
    position: "absolute",
    left: 20, // move icon left
    justifyContent: "center",
    alignItems: "center",
  },
});
