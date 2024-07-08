import { initTRPC, TRPCError } from '@trpc/server'
import { type CreateNextContextOptions } from '@trpc/server/adapters/next'
import { ZodError } from 'zod'
import { type NextApiRequest, type NextApiResponse } from 'next'
import { db } from '@/server/db'
import { validateRequest } from '@/server/auth'

interface CreateContextOptions {
  req: NextApiRequest
  res: NextApiResponse
}

const createInnerTRPCContext = async (opts: CreateContextOptions) => {
  const { user, session } = await validateRequest(opts.req, opts.res)
  return {
    db,
    req: opts.req,
    res: opts.res,
    user,
    session,
  }
}

export const createTRPCContext = (opts: CreateNextContextOptions) => {
  return createInnerTRPCContext({
    req: opts.req,
    res: opts.res,
  })
}

const t = initTRPC.context<typeof createTRPCContext>().create({
  errorFormatter({ shape, error }) {
    return {
      ...shape,
      data: {
        ...shape.data,
        zodError:
          error.code === 'BAD_REQUEST' && error.cause instanceof ZodError
            ? error.cause.flatten()
            : null,
        ...shape.data,
      },
    }
  },
})

const isAuthed = t.middleware(({ ctx, next }) => {
  if (!ctx.user || !ctx.session) {
    throw new TRPCError({ code: 'UNAUTHORIZED', message: 'Sign in to access' })
  }
  return next({
    ctx: {
      user: ctx.user,
      session: ctx.session,
    },
  })
})

const isAdmin = t.middleware(({ ctx, next }) => {
  if (ctx.user?.type !== 'admin' || !ctx.session) {
    throw new TRPCError({ code: 'UNAUTHORIZED', message: 'Be an admin to access' })
  }
  return next({
    ctx: {
      user: ctx.user,
      session: ctx.session,
    },
  })
})

export const createCallerFactory = t.createCallerFactory

export const createTRPCRouter = t.router

export const method = t.procedure

export const protectedMethod = t.procedure.use(isAuthed)

export const adminMethod = t.procedure.use(isAdmin)
