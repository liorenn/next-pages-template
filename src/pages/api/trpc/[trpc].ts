import { appRouter } from '@/server/routers/root'
import { createNextApiHandler } from '@trpc/server/adapters/next'
import { createTRPCContext } from '@/server/trpc'
import { env } from '@/server/env'

export default createNextApiHandler({
  router: appRouter,
  createContext: createTRPCContext,
  onError:
    env.nodeEnv === 'development'
      ? ({ path, error }) => {
          console.error(`❌ tRPC failed on ${path ?? '<no-path>'}: ${error.message}`)
        }
      : undefined,
})
