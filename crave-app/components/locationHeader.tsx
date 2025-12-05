//adds location header to discover page
import React, { useState } from "react";
import {
  FlatList,
  Modal,
  Pressable,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { Check, ChevronDown, MapPin } from "lucide-react-native";
import { theme } from "@/theme";
import { useLocationContext } from "@/lib/context";
import { TempLocationData } from "@/lib/locationShim";

export default function LocationHeader({ userName = "Christian" }) {
  const locations = TempLocationData;
  const { location, setNewLocation } = useLocationContext();
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
          <Text style={styles.locationText}>{location.name.split(",")[0]}</Text>
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
            keyExtractor={(item) => item.name}
            renderItem={({ item }) => (
              <TouchableOpacity
                style={[
                  styles.item,
                  location.name === item.name && styles.selectedItem,
                ]}
                onPress={() => {
                  setNewLocation(item);
                  setModalVisible(false);
                }}
              >
                <View style={styles.itemLeft}>
                  <MapPin size={16} color={theme.colors.mutedForeground} />
                  <Text style={styles.itemText}>{item.name}</Text>
                </View>
                {location.name === item.name && (
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
    width: "100%",
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
    borderRadius: 13,
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
