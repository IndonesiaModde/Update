import { publicProcedure, router } from "./_core/trpc";

export const appRouter = router({
  // Health check endpoint
  health: publicProcedure.query(() => ({
    status: "ok",
    timestamp: new Date().toISOString(),
  })),
});

export type AppRouter = typeof appRouter;
