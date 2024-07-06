import { NextApiRequest, NextApiResponse, createNextApiHandler } from '@trpc/server/adapters/next'

import { appRouter } from '@/server/routers/root'
import { createTRPCContext } from '@/server/trpc'
import { env } from '@/server/env'

const handler = createNextApiHandler({
  router: appRouter,
  createContext: createTRPCContext,
  onError:
    env.nodeEnv === 'development'
      ? ({ path, error }) => {
          console.error(`❌ tRPC failed on ${path ?? '<no-path>'}: ${error.message}`)
        }
      : undefined,
})

export default async (req: NextApiRequest, res: NextApiResponse) => {
  await handler(req, res)
}

export const config = {
  api: {
    bodyParser: false,
    responseLimit: '100mb',
  },
}
