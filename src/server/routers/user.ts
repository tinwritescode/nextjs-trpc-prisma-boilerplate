/**
 *
 * This is an example router, you can delete this file and then update `../pages/api/trpc/[trpc].tsx`
 */
import { Prisma } from '@prisma/client'
import { TRPCError } from '@trpc/server'
import { z } from 'zod'
import { createRouter } from '~/server/createRouter'
import { prisma } from '~/server/prisma'
import Crawler from 'crawler'

/**
 * Default selector for User.
 * It's important to always explicitly say which fields you want to return in order to not leak extra information
 * @see https://github.com/prisma/prisma/issues/9353
 */
const defaultPostSelect = Prisma.validator<Prisma.UserSelect>()({
  id: true,
  name: true,
  role: true,
  image: true,
  createdAt: true,
  updatedAt: true,
})

export const userRouter = createRouter()
  // get field token from user
  .query('getToken', {
    resolve: async ({ ctx }) => {
      try {
        if (!ctx.session) {
          throw new TRPCError({
            code: 'UNAUTHORIZED',
            message: 'You are not authorized to access this resource',
          })
        }

        const { user } = ctx.session

        const token = await prisma.account.findMany({
          where: {
            userId: user.id,
          },
          select: {
            access_token: true,
          },
        })

        return token
      } catch (error) {
        throw error
      }
    },
  })
