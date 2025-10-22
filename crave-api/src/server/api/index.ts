import {router} from "@/server/trpc";

export const appRouter = router({
    test: {}
})

export type AppRouter = typeof appRouter
