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
const defaultPostSelect = Prisma.validator<Prisma.TaskSelect>()({
  id: true,
  name: true,
  cover: true,
  type: true,
  gallery: true,
  owner: true,
  locations: true,
  campaigns: true,
  createdAt: true,
  updatedAt: true,
})

export const taskRouter = createRouter()
  // create
  .mutation('add', {
    input: z.object({
      id: z.string().uuid().optional(),
      title: z.string().min(1).max(32),
      text: z.string().min(1),
    }),
    async resolve({ input }) {
      const post = await prisma.post.create({
        data: input,
        select: defaultPostSelect,
      })
      return post
    },
  })
  // read
  .query('all', {
    async resolve({ ctx }) {
      /**
       * For pagination you can have a look at this docs site
       * @link https://trpc.io/docs/useInfiniteQuery
       */

      console.log(ctx.session)

      return prisma.user.findMany({
        select: defaultPostSelect,
      })
    },
  })
  .query('byId', {
    input: z.object({
      id: z.string(),
    }),
    async resolve({ input }) {
      const { id } = input
      const post = await prisma.post.findUnique({
        where: { id },
        select: defaultPostSelect,
      })
      if (!post) {
        throw new TRPCError({
          code: 'NOT_FOUND',
          message: `No post with id '${id}'`,
        })
      }
      return post
    },
  })
  // update
  .mutation('edit', {
    input: z.object({
      id: z.string().uuid(),
      data: z.object({
        // title: z.string().min(1).max(32).optional(),
        password: z.string().min(1).max(32).optional(),
        // text: z.string().min(1).optional(),
      }),
    }),
    async resolve({ input }) {
      const { id, data } = input
      const post = await prisma.user.update({
        where: { id },
        data,
        select: defaultPostSelect,
      })
      return post
    },
  })
  // delete
  .mutation('delete', {
    input: z.object({
      id: z.string(),
    }),
    async resolve({ input, ctx }) {
      if (!ctx.session?.user) {
        throw new TRPCError({
          code: 'FORBIDDEN',
          message: 'You are not allowed to delete posts',
        })
      }

      const { id } = input
      await prisma.user.delete({ where: { id } })
      return {
        id,
      }
    },
  })
