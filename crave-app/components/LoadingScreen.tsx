import React, { useEffect, useRef } from "react";
import {
  View,
  StyleSheet,
  Animated,
  Dimensions,
  Text,
} from "react-native";

const { width } = Dimensions.get("window");

export default function LoadingScreen() {
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
        }}
      >
        {/* 🍔 Burger Image */}
        <Animated.Image
          source={require("../assets/images/burger_transparent.png")}
          style={styles.burger}
          resizeMode="contain"
        />

        {/* App Name */}
        <Text style={styles.title}>crave</Text>

        {/* Tagline */}
        <Text style={styles.subtitle}>Swipe - Eat - Repeat</Text>
      </Animated.View>
    </View>
  );
}

const styles = StyleSheet.create({
  overlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: "#f1f1f1",
    justifyContent: "center",
    alignItems: "center",
    zIndex: 9999,
    elevation: 9999,
  },
  burger: {
    width: width * 0.4,
    height: width * 0.4,
    marginBottom: 10,
  },
  title: {
    fontFamily: "Fredoka",
    fontSize: 50,
    color: "#FF4747", 
    marginTop: -35,
  },
  subtitle: {
    fontFamily: "Nunito",
    fontSize: 14,
    color: "#FF9F1C",
    marginTop: 4,
    letterSpacing: 1,
  },
});