import { createTRPCOptionsProxy } from "@trpc/tanstack-react-query";
import type { AppRouter } from "@crave/api";
import { QueryClient } from "@tanstack/react-query";
import { createTRPCClient, httpBatchLink } from "@trpc/client";
import { TRPC_HOST } from "@/config";
import { auth } from "@/lib/firebase";

export const queryClient = new QueryClient();

const trpcClient = createTRPCClient<AppRouter>({
  links: [
    httpBatchLink({
      url: `${TRPC_HOST}/api/trpc`,
      async headers() {
        const token = await auth.currentUser?.getIdToken();
        // Only add the authorization header if the user is authenticated
        if (token) {
          return {
            Authorization: token,
          };
        } else {
          return {}
        }
      },
    }),
  ],
});

export const trpc = createTRPCOptionsProxy<AppRouter>({
  client: trpcClient,
  queryClient,
});
