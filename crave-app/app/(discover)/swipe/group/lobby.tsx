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
import FullPageMessage from "@/components/FullPageMessage";
import LoadingScreen from "@/components/LoadingScreen";
import { useGroupLobby } from "@/lib/hooks/group-lobby";
import { LobbyParams } from "@/lib/routeParams";
import { MoveLeft } from "lucide-react-native";
import { useState } from "react";

export default function Lobby() {
  const router = useRouter();
  const { code, create } = useLocalSearchParams<LobbyParams>();

  if (!code) {
    return (
      <FullPageMessage
        title="Something went wrong"
        message="Check the code and try again"
        CloseIcon={MoveLeft}
        closeText="Go Back"
        onClose={() => {
          router.replace("/(discover)/swipe/group/interstitial");
        }}
      />
    );
  } else {
    return <LobbyContent code={code} create={!!create} />;
  }
}

function LobbyContent({ code, create }: { code: string; create: boolean }) {
  const router = useRouter();
  const data = useGroupLobby(code, create);
  const [deleting, setDeleting] = useState(false);
  if (data === undefined || deleting) return <LoadingScreen />;
  else if (data === null)
    return (
      <FullPageMessage
        title="Lobby not found"
        message="Check the code and try again"
        CloseIcon={MoveLeft}
        closeText="Go Back"
        onClose={() => {
          router.replace("/(discover)/swipe/group/interstitial");
        }}
      />
    );
  const { status, members, self, ownerId } = data;
  const started = status !== "open";

  const selfFinished = self.data?.complete ?? false;
  const allFinished = members.every((m) => m.complete);

  const waitingOnOthers = selfFinished && !allFinished;

  // Determine button behavior
  const getButtonConfig = () => {
    if (allFinished) {
      return {
        text: "View Matches",
        enabled: true,
        action: () => router.replace("/swipe/group/complete"),
      };
    } else if (selfFinished) {
      // User is done, waiting for others
      return {
        text: "Go Back to Discover",
        enabled: true,
        action: () => router.replace("/(tabs)"),
      };
    } else if (started) {
      // Session started but user hasn't finished
      return {
        text: "Go Back to Discover",
        enabled: true,
        action: () =>
          router.replace({
            pathname: "/swipe/[mode]",
            params: { mode: "group", code },
          }),
      };
    } else {
      // Not started yet
      return {
        text: "Start Swiping",
        enabled: members.length > 1,
        disabledText: "Waiting for friends to join...",
        action: () =>
          router.replace({
            pathname: "/swipe/[mode]",
            params: { mode: "group", code },
          }),
      };
    }
  };

  const buttonConfig = getButtonConfig();

  const copyCode = () => {
    void Clipboard.setStringAsync(code);
  };

  const handleDelete = async () => {
    if (confirm("Are you sure you want to delete this lobby?")) {
      setDeleting(true);
      await data.delete();
      router.replace("/(tabs)");
      setDeleting(false);
    }
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
          {!started
            ? "Group Lobby"
            : waitingOnOthers
              ? "Waiting on others..."
              : allFinished
                ? "Group Complete!"
                : "Swiping in Progress"}
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
              <View style={{ display: "flex", flexDirection: "row", gap: 12 }}>
                <TouchableOpacity onPress={copyCode}>
                  <Ionicons name="copy-outline" size={28} color="#fff" />
                </TouchableOpacity>
                {self.data?.userId === ownerId && (
                  <TouchableOpacity onPress={handleDelete}>
                    <Ionicons name="trash-outline" size={28} color="#fff" />
                  </TouchableOpacity>
                )}
              </View>
            </View>

            <Text style={styles.smallText}>
              Friends can join using this code
            </Text>

            {/* Waiting section inside the gradient card */}
            {waitingOnOthers && (
              <View style={styles.waitingSection}>
                <Ionicons name="hourglass-outline" size={28} color="#fff" />
                <Text style={styles.waitingTitle}>
                  Waiting on others to finish swiping
                </Text>
                <Text style={styles.waitingText}>
                  Sit tight — we&apos;ll show matches soon!
                </Text>
              </View>
            )}
          </LinearGradient>
        </>
      )}

      <Text style={styles.lobbyTitle}>In Lobby ({members.length})</Text>
      {/* Scrollable List */}
      <ScrollView showsVerticalScrollIndicator={false}>
        {members.map((member, idx) => {
          return (
            <View key={idx} style={styles.lobbyItem}>
              <View style={styles.memberInfo}>
                <Text style={styles.name}>{member.name}</Text>
                {member.userId === ownerId && (
                  <Text style={styles.host}>Host</Text>
                )}
              </View>
              {member.complete && (
                <View style={styles.completeBadge}>
                  <Text style={styles.completeText}>✓ Done</Text>
                </View>
              )}
            </View>
          );
        })}

        <View style={{ height: 80 }} />
      </ScrollView>
      <StartSwipingButton
        enabled={buttonConfig.enabled ?? true}
        variant="group"
        text={buttonConfig.text}
        disabledText={buttonConfig.disabledText}
        onPress={buttonConfig.action}
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
  waitingCard: {
    borderRadius: 20,
    padding: 25,
    alignItems: "center",
    marginBottom: 20,
  },
  waitingSection: {
    marginTop: 16,
    paddingTop: 12,
    borderTopWidth: 1,
    borderTopColor: "rgba(255,255,255,0.2)",
    alignItems: "center",
  },

  waitingTitle: {
    color: "#fff",
    fontSize: 20,
    fontWeight: "700",
    marginTop: 12,
    textAlign: "center",
  },
  waitingText: {
    color: "#fff",
    marginTop: 8,
    textAlign: "center",
  },
  memberInfo: {
    flex: 1,
  },

  completeBadge: {
    backgroundColor: "#d8ffdf",
    paddingHorizontal: 12,
    paddingVertical: 5,
    borderRadius: 12,
  },

  completeText: {
    color: "#2e9c4f",
    fontWeight: "600",
    fontSize: 12,
  },
  lobbyItem: {
    backgroundColor: "#f5f5f7",
    padding: 18,
    borderRadius: 12,
    flexDirection: "row", // Changed from column to row
    alignItems: "center", // Changed from flex-start
    marginBottom: 12,
  },
});
