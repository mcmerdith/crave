import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Animated,
  ScrollView,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { Ionicons } from "@expo/vector-icons";
import * as Clipboard from "expo-clipboard";
import { useEffect, useRef } from "react";
import StartSwipingButton from "../../components/colorfulButton";
import { useRouter } from "expo-router";
import BackButton from "@/components/backButton";

export default function GroupLobby() {
  const router = useRouter();
  const sessionCode = "COBRCY";

  const handleStartSolo = () => {
    router.push("/swipeGroup");
  };

  const people = [
    { name: "You", emoji: "🧑‍💼", host: true },
    { name: "Clara", emoji: "👱‍♀️" },
    { name: "Matt", emoji: "👱‍♂️" },
    { name: "Ellie", emoji: "👱‍♀️", joined: true },
  ];

  // Animation refs for each item
  const anims = useRef(people.map(() => new Animated.Value(0))).current;

  useEffect(() => {
    let totalDelay = 0;

    const animations = anims.map((anim, i) => {
      if (i === 0) {
        // You spawn instantly
        return Animated.timing(anim, {
          toValue: 1,
          duration: 500,
          delay: 0,
          useNativeDriver: true,
        });
      }
      // Random step between 500ms–1500ms
      const step = Math.random() * 3000 + 800;

      totalDelay += step;

      return Animated.timing(anim, {
        toValue: 1,
        duration: 500,
        delay: totalDelay,
        useNativeDriver: true,
      });
    });

    Animated.stagger(0, animations).start();
  }, [anims]);

  const copyCode = () => {
    Clipboard.setStringAsync(sessionCode);
  };

  return (
    <View style={styles.container}>
      {/* Back */}
      <BackButton />
      <Text style={styles.title}>Group Lobby</Text>
      <Text style={styles.subtitle}>Share the code with your friends</Text>
      {/* Code Card */}
      <LinearGradient colors={["#FF8A00", "#E92E7F"]} style={styles.codeCard}>
        <Text style={styles.sessionLabel}>Session Code</Text>

        <View style={styles.codeRow}>
          <Text style={styles.sessionCode}>{sessionCode}</Text>
          <TouchableOpacity onPress={copyCode}>
            <Ionicons name="copy-outline" size={28} color="#fff" />
          </TouchableOpacity>
        </View>

        <Text style={styles.smallText}>Friends can join using this code</Text>
      </LinearGradient>
      <Text style={styles.lobbyTitle}>In Lobby ({people.length})</Text>
      {/* Scrollable List */}
      <ScrollView showsVerticalScrollIndicator={false}>
        {people.map((item, idx) => {
          const fade = anims[idx].interpolate({
            inputRange: [0, 1],
            outputRange: [0, 1],
          });

          const slide = anims[idx].interpolate({
            inputRange: [0, 1],
            outputRange: [20, 0], // slide upward
          });

          return (
            <Animated.View
              key={idx}
              style={[
                styles.lobbyItem,
                {
                  opacity: fade,
                  transform: [{ translateY: slide }],
                },
              ]}
            >
              <Text style={styles.emoji}>{item.emoji}</Text>

              <View>
                <Text style={styles.name}>{item.name}</Text>
                {item.host && <Text style={styles.host}>Host</Text>}
              </View>

              {item.joined && (
                <View style={styles.joinedBadge}>
                  <Text style={styles.joinedText}>Just joined</Text>
                </View>
              )}
            </Animated.View>
          );
        })}

        <View style={{ height: 80 }} />
      </ScrollView>
      <StartSwipingButton
        canStart={people.length > 1}
        variant="group"
        text="Start Swiping"
        onPress={() => {
          handleStartSolo();
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
    flexDirection: "row",
    alignItems: "center",
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
