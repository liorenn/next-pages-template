import { z } from 'zod'

const envVariables = z.object({
  nodeEnv: z.string(),
})

export const env = envVariables.parse({
  nodeEnv: process.env.NODE_ENV,
})
