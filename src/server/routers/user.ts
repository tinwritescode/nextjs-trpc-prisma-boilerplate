/**
 *
 * This is an example router, you can delete this file and then update `../pages/api/trpc/[trpc].tsx`
 */
import { Prisma } from '@prisma/client'
import { TRPCError } from '@trpc/server'
import { z } from 'zod'
import { createRouter } from '~/server/createRouter'
import { prisma } from '~/server/prisma'

/**
 * Default selector for User.
 * It's important to always explicitly say which fields you want to return in order to not leak extra information
 * @see https://github.com/prisma/prisma/issues/9353
 */
const defaultUserSelect = Prisma.validator<Prisma.UserSelect>()({
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
  .query('getUser', {
    input: z.object({
      id: z.string(),
    }),
    resolve: async ({ ctx, input }) => {
      try {
        const { id } = input
        const user = await prisma.user.findUnique({
          where: {
            id,
          },
          select: defaultUserSelect,
        })

        if (!user) {
          throw new TRPCError({
            code: 'NOT_FOUND',
            message: 'User not found',
          })
        }

        return user
      } catch (error) {
        throw error
      }
    },
  })
  .mutation('addImageToGallery', {
    input: z.object({
      url: z.string().regex(/^https?:\/\//),
    }),
    resolve: async ({ ctx, input }) => {
      try {
        if (!ctx.session) {
          throw new TRPCError({
            code: 'UNAUTHORIZED',
            message: 'You are not authorized to access this resource',
          })
        }

        const { url } = input
        const user = await prisma.user.findUnique({
          where: {
            id: ctx.session.user.id,
          },
          select: defaultUserSelect,
        })

        if (!user) {
          throw new TRPCError({
            code: 'NOT_FOUND',
            message: 'User not found',
          })
        }

        const image = await prisma.image.create({
          data: {
            url,
            user: {
              connect: {
                id: user.id,
              },
            },
          },
        })

        return image
      } catch (error) {
        throw error
      }
    },
  })
  // get my gallery
  .query('getMyGallery', {
    resolve: async ({ ctx }) => {
      try {
        if (!ctx.session) {
          throw new TRPCError({
            code: 'UNAUTHORIZED',
            message: 'You are not authorized to access this resource',
          })
        }

        const user = await prisma.user.findUnique({
          where: {
            id: ctx.session.user.id,
          },
          select: defaultUserSelect,
        })

        if (!user) {
          throw new TRPCError({
            code: 'NOT_FOUND',
            message: 'User not found',
          })
        }

        const images = await prisma.image.findMany({
          where: {
            user: {
              id: user.id,
            },
          },
          select: {
            url: true,
          },
        })

        return images
      } catch (error) {
        throw error
      }
    },
  })
