import Button from "@/components/button";
import { useCurrentUser } from "@/lib/datastore/user-service";
import { auth } from "@/lib/firebase";
import { router } from "expo-router";
import { signOut } from "firebase/auth";
import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const Profile = () => {
  const user = useCurrentUser();

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "#f9f9f9" }}>
      <View style={styles.container}>
        <Text style={styles.header}>Profile</Text>
        {!user && (
          <Button title="Sign In" onPress={() => router.push("/sign-in")} />
        )}
        {user && (
          <div>
            <Button title="Sign Out" onPress={() => signOut(auth)} />
            <Text>{user.displayName}</Text>
            <Text style={styles.label}>Email</Text>
            <Text>{user.email}</Text>
          </div>
        )}
      </View>
    </SafeAreaView>
  );
};

export default Profile;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: "#fff",
  },
  header: {
    fontSize: 28,
    fontWeight: "bold",
    marginBottom: 30,
  },
  label: {
    fontSize: 18,
    fontWeight: "600",
    marginVertical: 10,
  },
  priceLabels: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 5,
  },
  priceLabel: {
    fontSize: 16,
    color: "#999",
  },
  priceLabelActive: {
    color: "#7b13ca",
    fontWeight: "bold",
  },
  applyButton: {
    marginTop: 40,
    backgroundColor: "#FF6347",
    paddingVertical: 15,
    borderRadius: 10,
    alignItems: "center",
  },
  applyText: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "bold",
  },
});
