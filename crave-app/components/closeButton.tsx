import { StyleSheet, TouchableOpacity } from "react-native";
import { useRouter } from "expo-router";
import AntDesign from "@expo/vector-icons/AntDesign";

export default function CloseButton() {
  const router = useRouter();
  return (
    <TouchableOpacity
      onPress={() => router.replace("/")}
      style={{
        backgroundColor: "#2224",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        padding: 7,
        borderRadius: 999,
      }}
    >
      <AntDesign name="close" size={22} color={"#222d"} />
    </TouchableOpacity>
  );
}
