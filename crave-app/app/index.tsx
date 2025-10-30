import { Text, View } from "react-native";
import React from "react";
import Button from "@/components/button";

export default function Index() {
  return (
    <View
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      < Text style={{ fontSize: 24, marginBottom: 20 }}>Crave App</Text>
      <Button
        title="Group Mode/Solo Mode"
        onPress={() => alert("Start swiping")}
        variant="default"
        size="medium"
        />
    </View>
  );
}
