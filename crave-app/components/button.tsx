import React from "react";
import { TouchableOpacity, Text, StyleSheet, GestureResponderEvent } from "react-native";


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

