import { fetchRequestHandler } from "@trpc/server/adapters/fetch";
import { appRouter } from "@/server/api/routers";
import { createContext } from "@/server/api/trpc";

const CORS_HEADERS = {
  "Access-Control-Allow-Origin": "http://localhost:8081",
  "Access-Control-Allow-Headers": "*",
};

export function OPTIONS() {
  return new Response(null, {
    status: 200,
    headers: new Headers(CORS_HEADERS),
  });
}

async function handler(req: Request) {
  const response = await fetchRequestHandler({
    endpoint: "/api/trpc",
    req,
    router: appRouter,
    createContext: ({ req }) => createContext(req),
  });

  Object.entries(CORS_HEADERS).forEach(([k, v]) => {
    response.headers.set(k, v);
  });

  return response;
}
export { handler as GET, handler as POST };
