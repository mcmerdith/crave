import z from "zod";

export const UserId = z.string({ error: "Invalid user ID" });
