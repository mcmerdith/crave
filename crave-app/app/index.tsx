import { Text, View } from "react-native";
import { trpc } from "@/lib/trpc";
import { useQuery } from "@tanstack/react-query";

export default function Index() {
  const x = useQuery(trpc.places.queryOptions())
  const { data } = x;
  return (
    <View
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Text>Data: { data?.id ?? "unknown"}</Text>
    </View>
  );
}
