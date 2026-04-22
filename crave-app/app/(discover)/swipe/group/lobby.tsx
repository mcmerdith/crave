import StartSwipingButton from "@/components/colorfulButton";
import { Ionicons } from "@expo/vector-icons";
import * as Clipboard from "expo-clipboard";
import { LinearGradient } from "expo-linear-gradient";
import { useLocalSearchParams, useRouter } from "expo-router";
import {
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

import BackButton from "@/components/backButton";
import CloseButton from "@/components/closeButton";
import { useGroupLobby } from "@/lib/hooks/group-lobby";
import { LobbyParams } from "@/lib/routeParams";

export default function Lobby() {
  const { code } = useLocalSearchParams<LobbyParams>();
  // const data = useGroupLobby(code === "" ? undefined : code);
  const data = useGroupLobby(undefined);

  if (data === undefined) {
    return <p>Loading</p>;
  } else if (data === null) {
    return <p>Not found</p>;
  } else {
    return <LobbyContent lobby={data} />;
  }
}

function LobbyContent({
  lobby: { id: code, status, members, ownerId },
}: {
  lobby: NonNullable<ReturnType<typeof useGroupLobby>>;
}) {
  console.log(members.map((m) => m.userId));
  const router = useRouter();
  const started = status !== "open";

  const handleStartGroup = () => {
    router.replace("/swipe/group");
  };

  const viewMatches = () => {
    router.replace("/swipe/group/complete");
  };

  const copyCode = () => {
    void Clipboard.setStringAsync(code);
  };

  return (
    <View style={styles.container}>
      {/* Back */}
      {!started && <BackButton />}
      <View
        style={{
          display: "flex",
          flexDirection: "row",
          justifyContent: "space-between",
        }}
      >
        <Text style={styles.title}>
          {started ? "Waiting for your group..." : "Group Lobby"}
        </Text>
        {started && <CloseButton />}
      </View>
      {/* Code Card */}
      {!started && (
        <>
          <Text style={styles.subtitle}>Share the code with your friends</Text>
          <LinearGradient
            colors={["#FF8A00", "#E92E7F"]}
            style={styles.codeCard}
          >
            <Text style={styles.sessionLabel}>Session Code</Text>

            <View style={styles.codeRow}>
              <Text style={styles.sessionCode}>{code}</Text>
              <TouchableOpacity onPress={copyCode}>
                <Ionicons name="copy-outline" size={28} color="#fff" />
              </TouchableOpacity>
            </View>

            <Text style={styles.smallText}>
              Friends can join using this code
            </Text>
          </LinearGradient>
        </>
      )}
      <Text style={styles.lobbyTitle}>In Lobby ({members.length})</Text>
      {/* Scrollable List */}
      <ScrollView showsVerticalScrollIndicator={false}>
        {members.map((member, idx) => {
          return (
            <View key={idx} style={styles.lobbyItem}>
              <Text style={styles.name}>{member.name}</Text>
              {member.userId === ownerId && (
                <Text style={styles.host}>Host</Text>
              )}
            </View>
          );
        })}

        <View style={{ height: 80 }} />
      </ScrollView>
      <StartSwipingButton
        enabled={members.length > 1}
        variant="group"
        text={started ? "View Matches" : "Start Swiping"}
        disabledText={
          started ? "Waiting for friends..." : "Waiting for friends to join..."
        }
        onPress={() => {
          if (started) {
            viewMatches();
          } else {
            handleStartGroup();
          }
        }}
      />
    </View>
  );
}

// --- styles ---
const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 25,
    backgroundColor: "#fff",
    paddingTop: 60,
  },

  backButton: { marginBottom: 10 },
  backText: { fontSize: 18, color: "#555" },

  title: { fontSize: 28, fontWeight: "700" },
  subtitle: { color: "#777", marginBottom: 20 },

  codeCard: {
    width: "100%",
    borderRadius: 18,
    padding: 25,
    marginBottom: 25,
  },
  sessionLabel: {
    textAlign: "center",
    color: "#fff",
    marginBottom: 6,
  },
  sessionCode: {
    fontSize: 38,
    color: "#fff",
    fontWeight: "700",
    letterSpacing: 4,
    marginRight: 10,
  },
  codeRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
  },
  smallText: {
    textAlign: "center",
    color: "#fff",
    marginTop: 4,
  },

  lobbyTitle: {
    fontSize: 18,
    fontWeight: "600",
    marginBottom: 10,
  },

  lobbyItem: {
    backgroundColor: "#f5f5f7",
    padding: 18,
    borderRadius: 12,
    flexDirection: "column",
    alignItems: "flex-start",
    marginBottom: 12,
  },
  emoji: { fontSize: 30, marginRight: 15 },
  name: { fontSize: 18, fontWeight: "600" },
  host: { fontSize: 12, color: "#666" },

  joinedBadge: {
    marginLeft: "auto",
    backgroundColor: "#d8ffdf",
    paddingHorizontal: 12,
    paddingVertical: 5,
    borderRadius: 12,
  },
  joinedText: {
    color: "#2e9c4f",
    fontWeight: "600",
    fontSize: 12,
  },
});
