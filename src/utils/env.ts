import { z } from 'zod'

const clientEnvVariables = z.object({
  //websiteUrl: z.string(),
})

export const clientEnv = clientEnvVariables.parse({
  //websiteUrl: process.env.NEXT_PUBLIC_WEBSITE_URL,
})
