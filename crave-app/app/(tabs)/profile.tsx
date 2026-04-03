import { useCurrentUser } from "@/lib/datastore/user-service";
import { theme } from "@/theme";
import { AntDesign, EvilIcons } from "@expo/vector-icons";
import React, { useState } from "react";
import {
  FlatList,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import Modal from "react-native-modal";
import { SafeAreaView } from "react-native-safe-area-context";

interface Friend {
  id: number;
  name: string;
  username: string;
  mutualFavorites: number;
}

const mockFriends: Friend[] = [
  { id: 1, name: "Sarah Chen", username: "@sarahc", mutualFavorites: 12 },
  { id: 2, name: "Alex Rivera", username: "@arivera", mutualFavorites: 8 },
  { id: 3, name: "Jamie Park", username: "@jamiepark", mutualFavorites: 15 },
  { id: 4, name: "Marcus Johnson", username: "@mjohnson", mutualFavorites: 6 },
];

const Profile = () => {
  const user = useCurrentUser();

  const [searchQuery, setSearchQuery] = useState("");
  const [isEditModalVisible, setEditModalVisible] = useState(false);

  const filteredFriends = mockFriends.filter(
    (friend) =>
      friend.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      friend.username.toLowerCase().includes(searchQuery.toLowerCase()),
  );

  const renderFriend = ({ item }: { item: Friend }) => {
    const initials = item.name
      .split(" ")
      .map((n) => n[0])
      .join("");

    return (
      <View style={styles.friendRow}>
        {/* Avatar Placeholder */}
        <View style={styles.avatar}>
          <Text style={styles.avatarText}>{initials}</Text>
        </View>

        <View style={styles.friendInfo}>
          <Text style={styles.friendName}>{item.name}</Text>
          <Text style={styles.friendUsername}>{item.username}</Text>
        </View>

        <View style={styles.badge}>
          <Text style={styles.badgeText}>{item.mutualFavorites} mutual</Text>
        </View>
      </View>
    );
  };

  return (
    <SafeAreaView
      style={[styles.safeArea, { backgroundColor: theme.colors.background }]}
    >
      <FlatList
        ListHeaderComponent={
          <>
            {/* Profile Header */}
            <View style={styles.profileCard}>
              <View style={styles.profileAvatar}>
                <Text style={styles.profileAvatarText}>JD</Text>
              </View>

              <Text style={styles.profileName}>John Doe</Text>
              <Text style={styles.profileUsername}>@johndoe</Text>

              {/* Buttons */}
              <View style={styles.buttonRow}>
                <TouchableOpacity
                  style={styles.profileButton}
                  onPress={() => setEditModalVisible(true)}
                >
                  <Text style={styles.profileButtonText}>Edit Profile</Text>
                </TouchableOpacity>

                <TouchableOpacity style={styles.profileButton}>
                  <Text style={styles.profileButtonText}>Share Profile</Text>
                </TouchableOpacity>
              </View>
            </View>

            {/* Friends Header with count */}
            <Text style={styles.sectionTitle}>
              {mockFriends.length}{" "}
              {mockFriends.length === 1 ? "friend" : "friends"}
            </Text>

            {/* Search + Add */}
            <View style={styles.searchRow}>
              <View style={styles.searchContainer}>
                <EvilIcons name="search" size={25} color="#999" />
                <TextInput
                  placeholder="Search friends..."
                  placeholderTextColor="#999"
                  value={searchQuery}
                  onChangeText={setSearchQuery}
                  style={styles.searchInput}
                />
              </View>

              <TouchableOpacity style={styles.addButton}>
                <AntDesign name="user-add" size={18} color="#333" />
              </TouchableOpacity>
            </View>
          </>
        }
        data={filteredFriends}
        keyExtractor={(item) => item.id.toString()}
        renderItem={renderFriend}
        ListEmptyComponent={
          <Text style={styles.emptyText}>No friends found</Text>
        }
        contentContainerStyle={{ paddingBottom: 40 }}
      />
      {/* Edit Profile Modal */}
      <Modal
        isVisible={isEditModalVisible}
        onBackdropPress={() => setEditModalVisible(false)}
        style={styles.modalContainer}
        swipeDirection="down"
        onSwipeComplete={() => setEditModalVisible(false)}
      >
        <View style={styles.modalContent}>
          <Text style={styles.modalTitle}>Edit Profile</Text>

          {/* Profile picture placeholder */}
          <View style={styles.editAvatar}>
            <Text style={styles.profileAvatarText}>JD</Text>
          </View>

          {/* Name Input */}
          <TextInput
            style={styles.modalInput}
            placeholder="Name"
            placeholderTextColor="#999"
          />

          {/* Username Input */}
          <TextInput
            style={styles.modalInput}
            placeholder="Username"
            placeholderTextColor="#999"
          />

          <TouchableOpacity
            style={styles.saveButton}
            onPress={() => setEditModalVisible(false)}
          >
            <Text style={styles.saveButtonText}>Save</Text>
          </TouchableOpacity>
        </View>
      </Modal>
    </SafeAreaView>
  );
};

export default Profile;

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: theme.colors.background,
  },

  profileCard: {
    margin: 20,
    borderRadius: 16,
    padding: 20,
    alignItems: "center",
    //backgroundColor: "#fff",
    shadowColor: "#000", // shadow for iOS
    shadowOpacity: 0.1,
    shadowRadius: 4,
    shadowOffset: { width: 0, height: 2 },
    elevation: 3, // shadow for Android
  },

  profileAvatar: {
    width: 90,
    height: 90,
    borderRadius: 45,
    backgroundColor: "#ddd",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 10,
  },

  profileAvatarText: {
    fontSize: 28,
    fontWeight: "bold",
  },

  profileName: {
    fontSize: 22,
    fontWeight: "bold",
  },

  profileUsername: {
    fontSize: 14,
    color: theme.colors.mutedForeground,
    marginBottom: 15,
  },

  statsRow: {
    flexDirection: "row",
    gap: 40,
  },

  statBlock: {
    alignItems: "center",
  },

  statNumber: {
    fontSize: 20,
    fontWeight: "bold",
  },

  statLabel: {
    fontSize: 12,
    color: "#777",
  },

  sectionTitle: {
    fontSize: 20,
    fontWeight: "bold",
    marginHorizontal: 20,
    marginBottom: 10,
  },

  searchRow: {
    flexDirection: "row",
    marginHorizontal: 20,
    marginBottom: 15,
    gap: 10,
  },

  searchContainer: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#fff",
    paddingHorizontal: 10,
    borderRadius: 10,
    shadowColor: "#000",
    shadowOpacity: 0.05,
    shadowRadius: 2,
    shadowOffset: { width: 0, height: 1 },
    elevation: 1,
  },

  searchInput: {
    flex: 1,
    marginLeft: 8,
    height: 40,
    color: theme.colors.foreground,
  },

  addButton: {
    width: 40,
    height: 40,
    borderRadius: 10,
    backgroundColor: "#fff",
    justifyContent: "center",
    alignItems: "center",
    shadowColor: "#000",
    shadowOpacity: 0.05,
    shadowRadius: 2,
    shadowOffset: { width: 0, height: 1 },
    elevation: 1,
  },

  friendRow: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#fff",
    marginHorizontal: 20,
    padding: 15,
    borderRadius: 12,
    marginBottom: 10,
    shadowColor: "#000",
    shadowOpacity: 0.05,
    shadowRadius: 2,
    shadowOffset: { width: 0, height: 1 },
    elevation: 1,
  },

  avatar: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: "#ddd",
    justifyContent: "center",
    alignItems: "center",
    marginRight: 12,
  },

  avatarText: {
    fontWeight: "bold",
  },

  onlineIndicator: {
    position: "absolute",
    bottom: 2,
    right: 2,
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: "green",
    borderWidth: 2,
    borderColor: "#fff",
  },

  friendInfo: {
    flex: 1,
  },

  friendName: {
    fontWeight: "600",
  },

  friendUsername: {
    fontSize: 12,
    color: "#777",
  },

  badge: {
    backgroundColor: "#eee",
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 8,
  },

  badgeText: {
    fontSize: 12,
  },

  emptyText: {
    textAlign: "center",
    marginTop: 20,
    color: "#777",
  },

  buttonRow: {
    flexDirection: "row",
    marginTop: 10,
    marginBottom: 15,
    gap: 10,
  },

  profileButton: {
    flex: 1,
    backgroundColor: "#fff",
    paddingVertical: 8,
    borderRadius: 10,
    alignItems: "center",
    justifyContent: "center",
    shadowColor: "#000",
    shadowOpacity: 0.03,
    shadowRadius: 2,
    shadowOffset: { width: 0, height: 1 },
    elevation: 1,
  },

  profileButtonText: {
    color: theme.colors.foreground,
    fontWeight: "600",
  },

  modalContainer: { justifyContent: "flex-end", margin: 0 },
  modalContent: {
    height: "85%",
    backgroundColor: theme.colors.card,
    borderTopLeftRadius: 16,
    borderTopRightRadius: 16,
    padding: 20,
  },
  modalTitle: { fontSize: 22, fontWeight: "bold", marginBottom: 20 },
  editAvatar: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: "#ddd",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 20,
  },
  modalInput: {
    backgroundColor: "#f0f0f0",
    paddingHorizontal: 15,
    paddingVertical: 10,
    borderRadius: 12,
    marginBottom: 15,
    color: theme.colors.foreground,
  },
  saveButton: {
    backgroundColor: "#FF6347",
    paddingVertical: 12,
    borderRadius: 12,
    alignItems: "center",
    marginTop: 10,
  },
  saveButtonText: { color: "#fff", fontWeight: "bold" },
});
