import { NextApiRequest, NextApiResponse } from 'next'
import { getSession } from 'next-auth/react'
import { getToken } from 'next-auth/jwt'
import { prisma } from '../auth/[...nextauth]'
import {
  assertIsPlayerLoggedIn,
  assertMethodIsPost,
  insertLog,
  SECRET,
} from '../../../utils/apiUtils'

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const token = await getToken({ req, secret: SECRET })
  const session = await getSession({ req })

  assertMethodIsPost(req, res)
  assertIsPlayerLoggedIn(req, res)

  const userId: string = token.id

  const seed = await prisma.seed.create({
    data: {
      user: {
        connect: {
          id: userId,
          email: session.user.email,
        },
      },
    },
  })
  insertLog({
    logType: 'UNKNOWN',
    logMessage: `Player ${session.user.email} buy a new piece of seed for free`,
    userId,
  })

  res.status(200).json({
    message: 'Seed bought',
    seed,
  })
}
