import { NextApiRequest, NextApiResponse } from 'next'
import { getSession } from 'next-auth/react'
import { getToken } from 'next-auth/jwt'
import {
  SECRET,
  assertIsPlayerLoggedIn,
  assertMethodIsGet,
} from '../../../utils/apiUtils'
import { prisma } from '../auth/[...nextauth]'

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const token = await getToken({ req, secret: SECRET })
  const session = await getSession({ req })

  assertMethodIsGet(req, res)
  assertIsPlayerLoggedIn(req, res)

  const { page, limit }: { page: number; limit: number } = {
    page: parseInt(req.query.page as string) || 1,
    limit: parseInt(req.query.limit as string) || 10,
  }

  const notifications = await prisma.notification.findMany({
    where: {
      user: {
        id: token.id,
      },
    },
    orderBy: {
      createdAt: 'desc',
    },
    skip: (page - 1) * limit,
    take: limit,
  })

  const totalPages = await prisma.notification.count({
    where: {
      user: {
        id: token.id,
      },
    },
  })

  res.status(200).json({
    notifications,
    length: notifications.length,
    totalPages: Math.ceil(totalPages / limit),
  })
}
