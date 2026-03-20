import z from "zod";

export const UserId = z.string({ error: "Invalid user ID" });
export type UserId = z.infer<typeof UserId>;

export const UserPreferences = z.object({
  userId: UserId,
  dietary: z.object({
    vegetarian: z.boolean(),
    vegan: z.boolean(),
    glutenFree: z.boolean(),
  }),
  recentMatchIds: z.string().array(),
});
export type UserPreferences = z.infer<typeof UserPreferences>;
