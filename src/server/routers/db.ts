import { adminMethod, createTRPCRouter } from '@/server/trpc'

export const dbRouter = createTRPCRouter({
  hello: adminMethod.query(() => {
    return {
      greeting: `Hello User`,
    }
  }),
})
