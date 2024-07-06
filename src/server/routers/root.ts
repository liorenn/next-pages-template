import { createCallerFactory, createTRPCRouter } from '@/server/trpc'

import { authRouter } from '@/server/routers/auth'
import { dbRouter } from '@/server/routers/db'

export const appRouter = createTRPCRouter({
  auth: authRouter,
  db: dbRouter,
})

export type AppRouter = typeof appRouter

export const createCaller = createCallerFactory(appRouter)
