import { createTRPCOptionsProxy } from "@trpc/tanstack-react-query";
import type { AppRouter } from "@crave/api";
import { QueryClient } from "@tanstack/react-query";
import { createTRPCClient, httpBatchLink } from "@trpc/client";

export const queryClient = new QueryClient();

export const trpcClient = createTRPCClient<AppRouter>({
  links: [httpBatchLink({ url: "http://172.26.16.1:3000/api/trpc" })],
});

export const trpc = createTRPCOptionsProxy<AppRouter>({
  client: trpcClient,
  queryClient,
});
