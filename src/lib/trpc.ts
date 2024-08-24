import { httpBatchLink, httpLink, isNonJsonSerializable, splitLink } from '@trpc/client'
import { createTRPCNext } from '@trpc/next'
import { type inferRouterInputs, type inferRouterOutputs } from '@trpc/server'
import { type AppRouter } from '@/server/routers/root'

function getBaseUrl() {
  if (typeof window !== 'undefined') {
    return ''
  }
  if (process.env.VERCEL_URL) {
    return `https://${process.env.VERCEL_URL}`
  }
  return `http://localhost:${process.env.PORT ?? 3000}`
}

export const api = createTRPCNext<AppRouter>({
  overrides: {
    useMutation: {
      async onSuccess(opts) {
        await opts.originalFn()
        await opts.queryClient.invalidateQueries()
      },
    },
  },
  config() {
    const url = `${getBaseUrl()}/api/trpc`
    return {
      links: [
        // loggerLink(),
        splitLink({
          condition: (operation) => isNonJsonSerializable(operation.input),
          true: httpLink({
            url,
          }),
          false: httpBatchLink({
            url,
          }),
        }),
      ],
    }
  },
  ssr: false,
})

export type RouterInputs = inferRouterInputs<AppRouter>
export type RouterOutputs = inferRouterOutputs<AppRouter>
