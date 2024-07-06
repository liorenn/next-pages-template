import { PrismaClient } from '@prisma/client'
import { env } from '@/server/env'

const createPrismaClient = () => new PrismaClient({})

const globalForPrisma = globalThis as unknown as {
  prisma: ReturnType<typeof createPrismaClient> | undefined
}

export const db = globalForPrisma.prisma ?? createPrismaClient()

if (env.nodeEnv !== 'production') globalForPrisma.prisma = db
