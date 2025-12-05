import { View, Text, StyleSheet, Animated, ScrollView } from "react-native";
import { useEffect, useRef } from "react";
import ColorfulButton from "../../components/colorfulButton";
import { useRouter } from "expo-router";
import BackButton from "@/components/backButton";

export default function FinishedLobby() {
  const router = useRouter();
  const viewMatches = () => {
    router.replace("/groupSessionComplete");
  };

  const people = [
    { name: "You", emoji: "🧑‍💼", host: true },
    { name: "Clara", emoji: "👱‍♀️" },
    { name: "Matt", emoji: "👱‍♂️" },
    { name: "Ellie", emoji: "👱‍♀️" },
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

  return (
    <View style={styles.container}>
      {/* Back */}
      <BackButton />
      <Text style={styles.title}>Waiting for your group...</Text>
      {/* <Text style={styles.lobbyTitle}>In Lobby ({people.length})</Text> */}
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
            </Animated.View>
          );
        })}

        <View style={{ height: 80 }} />
      </ScrollView>
      <ColorfulButton
        canStart={people.length > 1}
        text="View Matches"
        variant="group"
        onPress={() => {
          viewMatches();
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
