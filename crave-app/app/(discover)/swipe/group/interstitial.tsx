import { LinearGradient } from "expo-linear-gradient";
import { useRouter } from "expo-router";
import {
  FlatList,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";

import BackButton from "@/components/backButton";
import { CreateLobbyId } from "@/lib/datastore/group-mode";
import { LobbyInfo, useUserLobbies } from "@/lib/hooks/group-lobby";
import { theme } from "@/theme";
import { Plus, UserPlus, Users } from "lucide-react-native";
import { useState } from "react";

export default function Lobby() {
  const router = useRouter();
  const [joinCode, setJoinCode] = useState("");
  const lobbies = useUserLobbies();

  const handleJoinLobby = () => {
    router.push(`/swipe/group/lobby?code=${joinCode}`);
  };

  const handleNewLobby = () => {
    const id = CreateLobbyId();
    router.push(`/swipe/group/lobby?code=${id}&create=true`);
  };

  const renderLobbyRow = ({ item }: { item: LobbyInfo }) => (
    <View style={styles.lobbyRow}>
      <View style={styles.lobbyInfo}>
        <Text style={styles.lobbyCode}>{item.lobbyId}</Text>
        <View style={styles.lobbyMeta}>
          <Users size={12} color={theme.colors.mutedForeground} />
          <Text style={styles.lobbyMetaText}>
            {item.memberCount} {item.memberCount === 1 ? "member" : "members"}
          </Text>
        </View>
      </View>
      <TouchableOpacity
        style={styles.reopenButton}
        onPress={() => router.push(`/swipe/group/lobby?code=${item.lobbyId}`)}
      >
        <Text style={styles.reopenButtonText}>Reopen</Text>
      </TouchableOpacity>
    </View>
  );

  return (
    <FlatList
      style={styles.list}
      contentContainerStyle={styles.contentContainer}
      ListHeaderComponent={
        <>
          <BackButton />
          <View style={styles.buttonContainer}>
            {/* JOIN BUTTON */}
            <View style={styles.buttonWrapper}>
              <LinearGradient
                colors={[theme.colors.orangeEnd, theme.colors.orangeStart]}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 1 }}
                style={styles.gradientButton}
              >
                <Text style={styles.buttonTitle}>Join a lobby</Text>

                <View style={styles.inputWrapper}>
                  <TextInput
                    style={[styles.joinInput, { flex: 1 }]}
                    placeholder="Enter the code from your friends"
                    placeholderTextColor="#999"
                    value={joinCode}
                    onChangeText={(t) => setJoinCode(t.toUpperCase())}
                  />
                </View>

                <TouchableOpacity
                  style={styles.iconContainer}
                  onPress={handleJoinLobby}
                >
                  <UserPlus color="#fff" size={28} />
                  <Text style={styles.buttonTitle}>Join</Text>
                </TouchableOpacity>
              </LinearGradient>
            </View>

            {/* CREATE BUTTON */}
            <TouchableOpacity
              style={styles.buttonWrapper}
              onPress={handleNewLobby}
            >
              <LinearGradient
                colors={[theme.colors.orangeStart, theme.colors.orangeEnd]}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 1 }}
                style={styles.gradientButton}
              >
                <Text style={styles.buttonTitle}>Create a lobby</Text>

                <View style={styles.iconContainer}>
                  <Plus color="#fff" size={28} />
                  <Text style={styles.buttonTitle}>Create</Text>
                </View>
              </LinearGradient>
            </TouchableOpacity>
          </View>

          <Text style={styles.sectionTitle}>Your Lobbies</Text>
        </>
      }
      data={lobbies ?? []}
      keyExtractor={(item) => item.lobbyId}
      renderItem={renderLobbyRow}
      ListEmptyComponent={
        <Text style={styles.emptyText}>
          {lobbies === undefined ? "Loading..." : "No active lobbies"}
        </Text>
      }
    />
  );
}

// --- styles ---
const styles = StyleSheet.create({
  list: {
    flex: 1,
    backgroundColor: "#fff",
  },
  contentContainer: {
    padding: 25,
    paddingTop: 60,
    paddingBottom: 40,
  },

  inputWrapper: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#f5f5f5",
    borderRadius: 12,
    paddingHorizontal: 14,
    height: 48,
  },
  joinInput: {
    flex: 1,
    fontSize: 15,
    color: theme.colors.foreground,
  },
  buttonContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    paddingVertical: 25,
    gap: 25,
  },
  buttonWrapper: {
    flex: 1,
    minWidth: 300,
    maxHeight: 215,
    borderRadius: 20,
    shadowRadius: 6,
    shadowOpacity: 0.15,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
  },
  gradientButton: {
    padding: 24,
    height: "100%",
    borderRadius: 20,
    overflow: "hidden",
    justifyContent: "space-between",
    gap: 10,
  },
  iconContainer: {
    backgroundColor: "rgba(255,255,255,0.25)",
    padding: 12,
    borderRadius: 40,
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "row",
    gap: 10,
  },
  buttonTitle: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "600",
  },

  // --- lobby list ---
  sectionTitle: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 12,
  },
  lobbyRow: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#fff",
    padding: 16,
    borderRadius: 12,
    marginBottom: 10,
    shadowColor: "#000",
    shadowOpacity: 0.06,
    shadowRadius: 3,
    shadowOffset: { width: 0, height: 2 },
    elevation: 2,
    borderWidth: 1,
    borderColor: "#f0f0f0",
  },
  lobbyInfo: {
    flex: 1,
  },
  lobbyCode: {
    fontSize: 16,
    fontWeight: "700",
    letterSpacing: 2,
    color: theme.colors.foreground,
  },
  lobbyMeta: {
    flexDirection: "row",
    alignItems: "center",
    gap: 4,
    marginTop: 4,
  },
  lobbyMetaText: {
    fontSize: 13,
    color: theme.colors.mutedForeground,
  },
  reopenButton: {
    backgroundColor: theme.colors.orangeStart,
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
  },
  reopenButtonText: {
    color: "#fff",
    fontWeight: "600",
    fontSize: 14,
  },
  emptyText: {
    textAlign: "center",
    color: theme.colors.mutedForeground,
    marginTop: 8,
  },
});
