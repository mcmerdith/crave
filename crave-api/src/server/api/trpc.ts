import { initTRPC } from "@trpc/server";
import { firebaseAuth } from "@/server/api/firebase";

type Context = {
  user: { id: string } | null;
};

export const createContext = async (request: Request): Promise<Context> => {
  const token = request.headers.get("Authorization");
  if (token) {
    try {
      const verifiedToken = await firebaseAuth.verifyIdToken(token);

      return {
        user: {
          id: verifiedToken.uid,
        },
      };
    } catch (e) {
      console.warn("Invalid token from client!", e);
    }
  }

  return {
    user: null,
  };
};

/**
 * Initialization of tRPC backend
 * Should be done only once per backend!
 */
const t = initTRPC.context<Context>().create();

/**
 * Export reusable router and procedure helpers
 * that can be used throughout the router
 */
export const router = t.router;
export const publicProcedure = t.procedure;
