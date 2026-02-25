import { GroupLobby } from "@crave/api";

export function useGroupLobby(lobbyId: string): GroupLobby | undefined {
  if (!lobbyId) return undefined;

  const lobby = {
    id: lobbyId,
    ownerId: "",
    status: "open" as const,
    members: [],
  };

  return lobby;
}
