import React from "react";
import {
  TouchableOpacity,
  Text,
  StyleSheet,
  GestureResponderEvent,
} from "react-native";

type ButtonProps = {
  title: string;
  onPress: (event: GestureResponderEvent) => void;
  variant?: "default" | "destructive" | "outline";
  size?: "small" | "medium" | "large";
};

export default function Button({
  title,
  onPress,
  variant = "default",
  size = "medium",
}: ButtonProps) {
  const backgroundColor =
    variant === "destructive"
      ? "#ef4444"
      : variant === "outline"
        ? "transparent"
        : "#2563eb";

  const textColor = variant === "outline" ? "#2563eb" : "#ffffff";

  const paddingVertical = size === "small" ? 8 : size === "large" ? 16 : 12;
  const paddingHorizontal = size === "small" ? 12 : size === "large" ? 24 : 16;

  return (
    <TouchableOpacity
      onPress={onPress}
      style={[
        styles.button,
        {
          backgroundColor,
          paddingVertical,
          paddingHorizontal,
        },
        variant === "outline" && styles.outline,
      ]}
    >
      <Text style={[styles.text, { color: textColor }]}>{title}</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  button: {
    borderRadius: 8,
    alignItems: "center",
    justifyContent: "center",
  },
  text: { fontSize: 16, fontWeight: "600" },
  outline: {
    borderWidth: 2,
    borderColor: "#2563eb",
  },
});
