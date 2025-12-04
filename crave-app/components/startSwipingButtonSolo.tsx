import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { Ionicons } from "@expo/vector-icons";
import { theme } from "@/theme";

interface StartSwipingButtonSoloProps {
  canStart: boolean;
  onPress: () => void;
}

export default function StartSwipingButtonSolo({
  canStart,
  onPress,
}: StartSwipingButtonSoloProps) {
  return (
    <View style={styles.container}>
      <TouchableOpacity disabled={!canStart} onPress={onPress} style={{ width: "100%" }}>
        <LinearGradient
          colors={
            canStart
              ? [theme.colors.purpleStart, theme.colors.purpleEnd] // solo colors
              : ["#e2e2e2", "#cfcfcf"] // disabled colors
          }
          style={[styles.button, { opacity: canStart ? 1 : 0.6 }]}
        >
          <Ionicons
            name="play-circle-outline"
            size={22}
            color={canStart ? "#fff" : "#666"}
          />
          <Text style={[styles.text, { color: canStart ? "#fff" : "#666" }]}>
            Start Swiping
          </Text>
        </LinearGradient>
      </TouchableOpacity>
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
  },
});
