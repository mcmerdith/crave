import z from "zod";
import { UserId } from "./user";

export const GroupLobbyId = z
  .string({ error: "Invalid lobby ID" })
  .length(6)
  .regex(/^[a-zA-Z1-9]+$/);
export type GroupLobbyId = z.infer<typeof GroupLobbyId>;

export const GroupLobbyStatus = z.enum(["open", "in-progress", "complete"]);
export type GroupLobbyStatus = z.infer<typeof GroupLobbyStatus>;

export const GroupLobby = z.object({
  id: GroupLobbyId,
  ownerId: UserId,
  status: GroupLobbyStatus,
  bestMatchId: z.string().nullable(),
});
export type GroupLobby = z.infer<typeof GroupLobby>;

export const SwipeResult = z.object({
  selectedRestaurantIds: z.string().array(),
  rejectedRestaurantIds: z.string().array(),
});
export type SwipeResult = z.infer<typeof SwipeResult>;

export const SwipeResultSubmission = z.object({
  lobbyId: GroupLobbyId.optional(),
  result: SwipeResult,
});
export type SwipeResultSubmission = z.infer<typeof SwipeResultSubmission>;

export const GroupLobbyMember = z.object({
  userId: UserId,
  name: z.string(),
  complete: z.boolean(),
  likeIds: z.string().array(),
  dislikeIds: z.string().array(),
});
export type GroupLobbyMember = z.infer<typeof GroupLobbyMember>;
