import { theme } from "@/theme";
import { LucideIcon, X } from "lucide-react-native";
import React, { useEffect, useRef } from "react";
import {
  Animated,
  Dimensions,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

const { width } = Dimensions.get("window");

export default function FullPageMessage({
  title,
  message,
  CloseIcon = X,
  closeText = "Close",
  onClose,
}: {
  title: string;
  message: string;
  CloseIcon?: LucideIcon;
  closeText?: string;
  onClose?: () => void;
}) {
  const scale = useRef(new Animated.Value(0.6)).current;
  const opacity = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.parallel([
      Animated.timing(opacity, {
        toValue: 1,
        duration: 800,
        useNativeDriver: true,
      }),
      Animated.spring(scale, {
        toValue: 1,
        friction: 5,
        useNativeDriver: true,
      }),
    ]).start();
  }, []);

  return (
    <View style={styles.overlay}>
      <Animated.View
        style={{
          alignItems: "center",
          opacity,
          transform: [{ scale }],
          flex: 1,
        }}
      >
        <View
          style={{
            alignItems: "center",
            justifyContent: "center",
            flex: 1,
          }}
        >
          <Text style={styles.title}>{title}</Text>
          <Text style={styles.subtitle}>{message}</Text>
          <TouchableOpacity style={styles.closeButton} onPress={onClose}>
            <CloseIcon color="#fff" size={20} />
            <Text style={styles.closeButtonText}>{closeText}</Text>
          </TouchableOpacity>
        </View>

        <View
          style={{
            alignItems: "center",
            marginBottom: 100,
          }}
        >
          {/* 🍔 Burger Image */}
          <Animated.Image
            source={require("../assets/images/burger_transparent.png")}
            style={styles.burger}
            resizeMode="contain"
          />

          {/* App Name */}
          <Text style={styles.apptitle}>crave</Text>

          {/* Tagline */}
          <Text style={styles.appsubtitle}>Swipe - Eat - Repeat</Text>
        </View>
      </Animated.View>
    </View>
  );
}

const styles = StyleSheet.create({
  closeButton: {
    backgroundColor: theme.colors.mutedForeground,
    marginTop: 30,
    padding: 16,
    borderRadius: 25,
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "row",
    gap: 10,
  },
  closeButtonText: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "600",
  },
  overlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: "#f1f1f1",
    justifyContent: "center",
    alignItems: "center",
    zIndex: 9999,
    elevation: 9999,
  },
  burger: {
    width: width * 0.2,
    height: width * 0.2,
  },
  title: {
    fontFamily: "Fredoka",
    fontSize: 50,
    color: "#FF4747",
  },
  subtitle: {
    fontFamily: "Nunito",
    fontSize: 14,
    color: "#FF9F1C",
    marginTop: 4,
    letterSpacing: 1,
  },
  apptitle: {
    fontFamily: "Fredoka",
    fontSize: 30,
    color: "#FF4747",
    marginTop: -25,
  },
  appsubtitle: {
    fontFamily: "Nunito",
    fontSize: 12,
    color: "#FF9F1C",
    marginTop: -3,
    letterSpacing: 1,
  },
});
