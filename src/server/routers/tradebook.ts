import { OrderStatus, Prisma, TradeType } from '@prisma/client'
import { OrderType } from '@prisma/client'
import { TRPCError } from '@trpc/server'
import { z } from 'zod'
import { createRouter } from '~/server/createRouter'
import { prisma } from '../prisma'
import { createOrderSchema } from '~/utils/schema'

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

export const tradeBookRouter = createRouter()
  .query('myTradeHistory', {
    input: z.object({
      months: z.array(z.number().min(1).max(12)),
      page: z.number().default(1),
      limit: z.number().default(31),
    }),
    resolve: async ({ ctx, input }) => {
      try {
        if (!ctx.session) {
          throw new TRPCError({
            code: 'UNAUTHORIZED',
            message: 'You are not authorized to access this resource',
          })
        }

        const { id } = ctx.session.user

        if (!id) {
          throw new TRPCError({
            code: 'UNAUTHORIZED',
            message: 'You are not authorized to access this resource',
          })
        }

        const { months, page, limit } = input

        const orders = await prisma.order.findMany({
          where: {
            userId: id,
            // tradeDate: {
            //   gte: new Date(new Date().getFullYear(), months[0] - 1, 1),
            //   lte: new Date(new Date().getFullYear(), months[1] - 1, 31),
            // },
          },
          skip: (page - 1) * limit,
          take: limit,
        })
        return orders
      } catch (error) {
        throw error
      }
    },
  })
  .mutation('createOrder', {
    input: createOrderSchema,
    resolve: async ({ ctx, input }) => {
      try {
        if (!ctx.session || !ctx.session?.user) {
          throw new TRPCError({
            code: 'UNAUTHORIZED',
            message: 'You are not authorized to access this resource',
          })
        }

        // console.log('tradeDate', input.tradeDate)

        const { id } = ctx.session.user

        console.log('id', id)

        const order = await prisma.order.create({
          data: {
            pair: input.pair,
            tradeDate: input.tradeDate,
            tradeType: input.tradeType,
            type: input.type,
            entry: input.entry,
            stoploss: input.stoploss,
            takeprofit: input.takeprofit,
            amount: input.amount,
            leverage: input.leverage,
            status: input.status,
            notes: input.notes,
            userId: id,
            images: {
              createMany: {
                data: input.images.map((image) => ({
                  url: image,
                })),
              },
            },
          },
        })

        return order
      } catch (error) {
        throw error
      }
    },
  })
