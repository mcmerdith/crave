import {publicProcedure, router} from "@/server/trpc";
import {createTRPCClient} from "@trpc/client";

export const appRouter = router({
    places: publicProcedure.query(() => {
        return {id: "1234"}
    })
})

export type AppRouter = typeof appRouter

export const trpc = createTRPCClient<AppRouter>({
    links: []
})

const d = trpc.places.query()
