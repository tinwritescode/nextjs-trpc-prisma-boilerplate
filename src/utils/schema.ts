import { OrderStatus, OrderType, TradeType } from '@prisma/client'
import { z } from 'zod'

export const createOrderSchema = z.object({
  pair: z.string(),
  //of OrderType
  type: z.nativeEnum(OrderType),
  entry: z.number(),
  stoploss: z.number(),
  takeprofit: z.number(),
  amount: z.number(),
  leverage: z.number(),
  status: z.nativeEnum(OrderStatus),
  images: z.array(z.string()),
  tradeType: z.nativeEnum(TradeType),
  notes: z.optional(z.string()),
  tradeDate: z.date(),
})
