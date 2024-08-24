import { appRouter } from '@/server/routers/root'
import { createNextApiHandler } from '@trpc/server/adapters/next'
import { createTRPCContext } from '@/server/trpc'

export default createNextApiHandler({
  router: appRouter,
  createContext: createTRPCContext,
})

export const config = {
  api: {
    bodyParser: false,
    responseLimit: '100mb',
  },
}
