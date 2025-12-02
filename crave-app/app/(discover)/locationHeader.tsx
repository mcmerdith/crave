//adds location header to discover page
import React, { useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  FlatList,
  Pressable,
  Modal,
  StyleSheet,
} from "react-native";
import { MapPin, ChevronDown, Check } from "lucide-react-native";
import { theme } from "@/theme";

const locations = [
  "Newark, DE",
  "Wilmington, DE",
  "Philadelphia, PA",
  "Baltimore, MD",
  "Washington, DC",
];

export default function LocationHeader({ userName = "Christian" }) {
  const [selectedLocation, setSelectedLocation] = useState(locations[0]);
  const [modalVisible, setModalVisible] = useState(false);

  return (
    <View style={styles.container}>
      {/* Welcome and location header */}
      <View style={styles.row}>
        <View>
          <Text style={styles.subtext}>Welcome,</Text>
          <Text style={styles.title}>{userName}</Text>
        </View>

        <TouchableOpacity
          style={styles.locationButton}
          onPress={() => setModalVisible(true)}
        >
          <MapPin size={16} color={theme.colors.primary} />
          <Text style={styles.locationText}>
            {selectedLocation.split(",")[0]}
          </Text>
          <ChevronDown size={16} color={theme.colors.foreground} />
        </TouchableOpacity>
      </View>

      {/* Dropdown List */}
      <Modal visible={modalVisible} transparent animationType="fade">
        <Pressable
          style={styles.backdrop}
          onPress={() => setModalVisible(false)}
        />

        <View style={styles.dropdown}>
          <FlatList
            data={locations}
            keyExtractor={(item) => item}
            renderItem={({ item }) => (
              <TouchableOpacity
                style={[
                  styles.item,
                  selectedLocation === item && styles.selectedItem,
                ]}
                onPress={() => {
                  setSelectedLocation(item);
                  setModalVisible(false);
                }}
              >
                <View style={styles.itemLeft}>
                  <MapPin size={16} color={theme.colors.mutedForeground} />
                  <Text style={styles.itemText}>{item}</Text>
                </View>
                {selectedLocation === item && (
                  <Check size={16} color={theme.colors.primary} />
                )}
              </TouchableOpacity>
            )}
          />
        </View>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginBottom: 16,
    paddingHorizontal: 20,
  },
  row: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    width: "100%",
  },
  subtext: {
    fontSize: 14,
    color: theme.colors.mutedForeground,
  },
  title: {
    fontSize: 20,
    fontWeight: "600",
    color: theme.colors.foreground,
  },
  locationButton: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: theme.colors.muted,
    paddingHorizontal: 14,
    paddingVertical: 8,
    borderRadius: 999,
  },
  locationText: {
    fontSize: 14,
    marginHorizontal: 6,
    color: theme.colors.foreground,
  },
  backdrop: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.25)",
  },
  dropdown: {
    position: "absolute",
    top: 120,
    right: 20,
    width: 260,
    maxHeight: 380,
    backgroundColor: theme.colors.card,
    borderRadius: 14,
    borderWidth: 1,
    borderColor: theme.colors.border,
  },
  item: {
    padding: 12,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  selectedItem: {
    backgroundColor: theme.colors.muted,
  },
  itemLeft: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
  },
  itemText: {
    fontSize: 14,
    color: theme.colors.foreground,
  },
});
