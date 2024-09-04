import { PrismaClient } from '@prisma/client'
import { serverEnv } from '@/lib/env'

const createPrismaClient = () => new PrismaClient({})

const globalForPrisma = globalThis as unknown as {
  prisma: ReturnType<typeof createPrismaClient> | undefined
}

export const db = globalForPrisma.prisma ?? createPrismaClient()

if (serverEnv.nodeEnv !== 'production') globalForPrisma.prisma = db
