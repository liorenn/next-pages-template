import { createTRPCRouter, method, protectedMethod } from '@/server/trpc'
import { hash, verify } from '@node-rs/argon2'

import { generateIdFromEntropySize } from 'lucia'
import { lucia } from '@/server/auth'
import { z } from 'zod'

export const authRouter = createTRPCRouter({
  getUser: method.query(({ ctx }) => {
    return ctx.user
  }),
  signUp: method
    .input(z.object({ email: z.string(), name: z.string(), password: z.string() }))
    .mutation(async ({ ctx, input }) => {
      console.log('hello')
      const user = await ctx.db.user.findUnique({ where: { email: input.email } })
      if (user) return { error: true, message: 'Email already exists', user: null }
      console.log(user)
      const passwordHash = await hash(input.password, {
        memoryCost: 19456,
        timeCost: 2,
        outputLen: 32,
        parallelism: 1,
      })

      const userId = generateIdFromEntropySize(10)
      await ctx.db.user.create({
        data: {
          id: userId,
          email: input.email,
          name: input.name,
          passwordHash: passwordHash,
          type: 'user',
        },
      })

      const session = await lucia.createSession(userId, {})
      ctx.res.appendHeader('Set-Cookie', lucia.createSessionCookie(session.id).serialize())
      return { error: false, message: 'User Signed Up Successfully', user: ctx.user }
    }),
  signIn: method
    .input(z.object({ email: z.string(), password: z.string() }))
    .mutation(async ({ ctx, input }) => {
      const user = await ctx.db.user.findUnique({ where: { email: input.email } })
      if (!user) return { error: true, message: 'Incorrect Email or Password', user: null }
      const validPassword = await verify(user.passwordHash, input.password, {
        memoryCost: 19456,
        timeCost: 2,
        outputLen: 32,
        parallelism: 1,
      })
      if (!validPassword) return { error: true, message: 'Incorrect Email or Password' }

      const session = await lucia.createSession(user.id, {})
      ctx.res.appendHeader('Set-Cookie', lucia.createSessionCookie(session.id).serialize())
      return { error: false, message: 'User Signed In Successfully', user: ctx.user }
    }),
  signOut: protectedMethod.mutation(async ({ ctx }) => {
    if (!ctx.user || !ctx.session) return { error: true, message: 'User Not Found' }
    await lucia.invalidateSession(ctx.session.id)
    ctx.res.setHeader('Set-Cookie', lucia.createBlankSessionCookie().serialize())
    return { error: false, message: 'User Signed Out Successfully' }
  }),
})
