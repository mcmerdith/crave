import { createEnv } from "@t3-oss/env-nextjs";
import { z } from "zod";

export const env = createEnv({
  /*
   * Serverside Environment variables, not available on the client.
   * Will throw if you access these variables on the client.
   */
  server: {
    FIREBASE_ADMIN_PRIVKEY: z.string(),
    GOOGLE_API_KEY: z.string(),
    NODE_ENV: z
      .enum(["development", "production", "test"])
      .transform((e) => (e === "production" ? "production" : "development")),
  },
  /*
   * Environment variables available on the client (and server).
   *
   * 💡 You'll get type errors if these are not prefixed with NEXT_PUBLIC_.
   */
  client: {
    /* Nothing Yet */
  },
  /*
   * Due to how Next.js bundles environment variables on Edge and Client,
   * we need to manually destructure them to make sure all are included in bundle.
   *
   * 💡 You'll get type errors if not all variables from `server` & `client` are included here.
   */
  runtimeEnv: {
    FIREBASE_ADMIN_PRIVKEY: process.env.FIREBASE_ADMIN_PRIVKEY,
    GOOGLE_API_KEY: process.env.GOOGLE_API_KEY,
    NODE_ENV: process.env.NODE_ENV,
  },
});
