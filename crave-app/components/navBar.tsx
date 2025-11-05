import React from "react";
import { View, TouchableOpacity, Text, StyleSheet } from "react-native";
import Feather from "@expo/vector-icons/Feather";
import Octicons from "@expo/vector-icons/Octicons";
import AntDesign from "@expo/vector-icons/AntDesign";

const NavBar = ({ onHomePress, onSearchPress, onProfilePress }: any) => {
  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.button} onPress={onHomePress}>
        <AntDesign name="compass" size={24} color="black" />{" "}
        <Text style={styles.label}>Discover</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.button} onPress={onSearchPress}>
        <Feather name="heart" size={24} color="black" />{" "}
        <Text style={styles.label}>Matches</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.button} onPress={onProfilePress}>
        <Octicons name="sliders" size={24} color="black" />{" "}
        <Text style={styles.label}>Filters</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
    backgroundColor: "#ffffffff",
    paddingVertical: 10,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    width: "100%",
  },
  button: {
    alignItems: "center",
  },
  label: {
    color: "black",
    fontSize: 12,
    fontWeight: "bold",
    marginTop: 4,
  },
});

export default NavBar;
