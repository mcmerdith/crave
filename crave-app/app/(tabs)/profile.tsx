import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  FlatList,
  TouchableOpacity,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { AntDesign, EvilIcons, Feather, MaterialIcons } from "@expo/vector-icons";
import { theme } from "@/theme";
import Modal from "react-native-modal";

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

//Auth Screen

interface AuthScreenProps {
  onAuth: (name: string, username: string) => void;
}

const AuthScreen = ({ onAuth }: AuthScreenProps) => {
  const [isSignUp, setIsSignUp] = useState(true);
  const [fullName, setFullName] = useState("");
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const handleSubmit = () => {
    const resolvedName = isSignUp ? fullName.trim() || "John Doe" : "John Doe";
    const resolvedUsername = isSignUp
      ? username.trim()
        ? `@${username.replace(/^@/, "")}`
        : "@johndoe"
      : "@johndoe";
    onAuth(resolvedName, resolvedUsername);
  };

  const isDisabled = isSignUp
    ? !fullName.trim() || !email.trim() || !password.trim()
    : !email.trim() || !password.trim();

  return (
    <KeyboardAvoidingView
      style={styles.authFlex}
      behavior={Platform.OS === "ios" ? "padding" : undefined}
    >
      <ScrollView
        contentContainerStyle={styles.authScroll}
        keyboardShouldPersistTaps="handled"
      >
        {/* Icon */}
        <View style={styles.authIconCircle}>
          <Feather name="user" size={44} color={theme.colors.foreground} />
        </View>

        {/* Title */}
        <Text style={styles.authTitle}>{isSignUp ? "Create Account" : "Welcome Back"}</Text>
        <Text style={styles.authSubtitle}>
          {isSignUp
            ? "Sign up to connect with friends"
            : "Sign in to your account"}
        </Text>

        {/* Card */}
        <View style={styles.authCard}>
          {/* Full Name – sign up only */}
          {isSignUp && (
            <View style={styles.inputWrapper}>
              <Feather name="user" size={18} color="#999" style={styles.inputIcon} />
              <TextInput
                style={styles.authInput}
                placeholder="Full Name"
                placeholderTextColor="#999"
                value={fullName}
                onChangeText={setFullName}
                autoCapitalize="words"
              />
            </View>
          )}

          {/* Username – sign up only */}
          {isSignUp && (
            <View style={styles.inputWrapper}>
              <Text style={styles.atSign}>@</Text>
              <TextInput
                style={styles.authInput}
                placeholder="Username"
                placeholderTextColor="#999"
                value={username}
                onChangeText={setUsername}
                autoCapitalize="none"
              />
            </View>
          )}

          {/* Email */}
          <View style={styles.inputWrapper}>
            <MaterialIcons name="email" size={18} color="#999" style={styles.inputIcon} />
            <TextInput
              style={styles.authInput}
              placeholder="Email"
              placeholderTextColor="#999"
              value={email}
              onChangeText={setEmail}
              keyboardType="email-address"
              autoCapitalize="none"
            />
          </View>

          {/* Password */}
          <View style={styles.inputWrapper}>
            <Feather name="lock" size={18} color="#999" style={styles.inputIcon} />
            <TextInput
              style={[styles.authInput, { flex: 1 }]}
              placeholder="Password"
              placeholderTextColor="#999"
              value={password}
              onChangeText={setPassword}
              secureTextEntry={!showPassword}
            />
            <TouchableOpacity
              onPress={() => setShowPassword((v) => !v)}
              style={styles.eyeButton}
            >
              <Feather
                name={showPassword ? "eye-off" : "eye"}
                size={18}
                color="#999"
              />
            </TouchableOpacity>
          </View>

          {/* Submit */}
          <TouchableOpacity
            style={[styles.authButton, isDisabled && styles.authButtonDisabled]}
            onPress={handleSubmit}
            disabled={isDisabled}
          >
            <Text style={styles.authButtonText}>
              {isSignUp ? "Sign Up" : "Sign In"}
            </Text>
          </TouchableOpacity>
        </View>

        {/* Toggle */}
        <View style={styles.toggleRow}>
          <Text style={styles.toggleText}>
            {isSignUp ? "Already have an account? " : "Don't have an account? "}
          </Text>
          <TouchableOpacity onPress={() => setIsSignUp((v) => !v)}>
            <Text style={styles.toggleLink}>
              {isSignUp ? "Sign In" : "Sign Up"}
            </Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

// Main Profile Screen

const Profile = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [profileName, setProfileName] = useState("John Doe");
  const [profileUsername, setProfileUsername] = useState("@johndoe");
  const [searchQuery, setSearchQuery] = useState("");
  const [isEditModalVisible, setEditModalVisible] = useState(false);

  const handleAuth = (name: string, username: string) => {
    setProfileName(name);
    setProfileUsername(username);
    setIsAuthenticated(true);
  };

  const handleSignOut = () => {
    setIsAuthenticated(false);
    setProfileName("John Doe");
    setProfileUsername("@johndoe");
  };

  const filteredFriends = mockFriends.filter(
    (friend) =>
      friend.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      friend.username.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const renderFriend = ({ item }: { item: Friend }) => {
    const initials = item.name
      .split(" ")
      .map((n) => n[0])
      .join("");

    return (
      <View style={styles.friendRow}>
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

  // Derive initials from profileName
  const profileInitials = profileName
    .split(" ")
    .map((n) => n[0])
    .join("")
    .toUpperCase()
    .slice(0, 2);

  if (!isAuthenticated) {
    return (
      <SafeAreaView style={[styles.safeArea, { backgroundColor: theme.colors.background }]}>
        <AuthScreen onAuth={handleAuth} />
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={[styles.safeArea, { backgroundColor: theme.colors.background }]}>
      <FlatList
        ListHeaderComponent={
          <>
            {/* Profile Header */}
            <View style={styles.profileCard}>
              <View style={styles.profileAvatar}>
                <Text style={styles.profileAvatarText}>{profileInitials}</Text>
              </View>

              <Text style={styles.profileName}>{profileName}</Text>
              <Text style={styles.profileUsername}>{profileUsername}</Text>

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

              {/* Sign Out */}
              <TouchableOpacity style={styles.signOutButton} onPress={handleSignOut}>
                <Feather name="log-out" size={14} color="#FF6347" style={{ marginRight: 5 }} />
                <Text style={styles.signOutText}>Sign Out</Text>
              </TouchableOpacity>
            </View>

            {/* Friends Header with count */}
            <Text style={styles.sectionTitle}>
              {mockFriends.length} {mockFriends.length === 1 ? "friend" : "friends"}
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
        ListEmptyComponent={<Text style={styles.emptyText}>No friends found</Text>}
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

          <View style={styles.editAvatar}>
            <Text style={styles.profileAvatarText}>{profileInitials}</Text>
          </View>

          <TextInput
            style={styles.modalInput}
            placeholder="Name"
            placeholderTextColor="#999"
          />
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

  // ── Auth ──────────────────────────────────────────────
  authFlex: { flex: 1 },
  authScroll: {
    flexGrow: 1,
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 24,
    paddingVertical: 40,
  },
  authIconCircle: {
    width: 90,
    height: 90,
    borderRadius: 45,
    backgroundColor: "#f0f0f0",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 20,
  },
  authTitle: {
    fontSize: 26,
    fontWeight: "bold",
    color: theme.colors.foreground,
    marginBottom: 6,
  },
  authSubtitle: {
    fontSize: 14,
    color: theme.colors.mutedForeground,
    marginBottom: 28,
  },
  authCard: {
    width: "100%",
    backgroundColor: "#fff",
    borderRadius: 16,
    padding: 20,
    shadowColor: "#000",
    shadowOpacity: 0.07,
    shadowRadius: 8,
    shadowOffset: { width: 0, height: 3 },
    elevation: 3,
    gap: 14,
  },
  inputWrapper: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#f5f5f5",
    borderRadius: 12,
    paddingHorizontal: 14,
    height: 48,
  },
  inputIcon: {
    marginRight: 10,
  },
  atSign: {
    fontSize: 16,
    color: "#999",
    marginRight: 8,
    fontWeight: "600",
  },
  authInput: {
    flex: 1,
    fontSize: 15,
    color: theme.colors.foreground,
  },
  eyeButton: {
    paddingLeft: 10,
  },
  authButton: {
    backgroundColor: "#FF6347",
    paddingVertical: 14,
    borderRadius: 12,
    alignItems: "center",
    marginTop: 4,
  },
  authButtonDisabled: {
    opacity: 0.45,
  },
  authButtonText: {
    color: "#fff",
    fontWeight: "700",
    fontSize: 16,
  },
  toggleRow: {
    flexDirection: "row",
    marginTop: 24,
    alignItems: "center",
  },
  toggleText: {
    color: theme.colors.mutedForeground,
    fontSize: 14,
  },
  toggleLink: {
    color: "#FF6347",
    fontWeight: "700",
    fontSize: 14,
  },

  // ── Profile ───────────────────────────────────────────
  profileCard: {
    margin: 20,
    borderRadius: 16,
    padding: 20,
    alignItems: "center",
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowRadius: 4,
    shadowOffset: { width: 0, height: 2 },
    elevation: 3,
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
  buttonRow: {
    flexDirection: "row",
    marginTop: 10,
    marginBottom: 10,
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
  signOutButton: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 6,
    paddingVertical: 6,
    paddingHorizontal: 14,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: "#FF634730",
    backgroundColor: "#FF634710",
  },
  signOutText: {
    color: "#FF6347",
    fontWeight: "600",
    fontSize: 13,
  },

  // ── Friends ───────────────────────────────────────────
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
  avatarText: { fontWeight: "bold" },
  friendInfo: { flex: 1 },
  friendName: { fontWeight: "600" },
  friendUsername: { fontSize: 12, color: "#777" },
  badge: {
    backgroundColor: "#eee",
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 8,
  },
  badgeText: { fontSize: 12 },
  emptyText: { textAlign: "center", marginTop: 20, color: "#777" },

  // ── Modal ─────────────────────────────────────────────
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
