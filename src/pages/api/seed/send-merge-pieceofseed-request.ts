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

  assertMethodIsPost(req, res), assertIsPlayerLoggedIn(req, res)

  const userId: string = token.id
  const data = {
    receiverId: req.body.receiverId as string,
    message: req.body.message as string,
  }

  if (data.message.length > 100) {
    res.status(400).json({ errors: ['Message is too long'] })
    return
  }
  if (!data.receiverId) {
    res.status(400).json({
      errors: ['Missing receiverId'],
    })
    return
  }
  if (userId === data.receiverId) {
    res.status(400).json({
      errors: ['You cannot send a merge request to yourself'],
    })
    return
  }
  if (
    await prisma.mergeRequest.count({
      where: {
        user: {
          id: userId,
        },
        receiver: {
          id: data.receiverId,
        },
      },
    })
  ) {
    res.status(400).json({
      errors: ['You already have a merge request pending with this player'],
    })
    return
  }
  if (
    await prisma.mergeRequest.count({
      where: {
        receiver: {
          id: userId,
        },
        user: {
          id: data.receiverId,
        },
      },
    })
  ) {
    res.status(400).json({
      errors: ['This player already has a merge request pending with you'],
    })
    return
  }

  const request = await prisma.mergeRequest.create({
    data: {
      user: {
        connect: {
          id: userId,
          email: session.user.email,
        },
      },
      receiver: {
        connect: {
          id: data.receiverId,
        },
      },
      message:
        data.message ||
        'Hi, I would like to merge with you a Piece of Seed. Please accept my request.',
    },
  })
  insertLog({
    logMessage: `Player ${userId} sent merge request ${request.id}`,
    logType: 'MERGE_PROPOSAL',
    userId,
  })
  res.status(200).json({
    message: 'Merge request sent',
    request,
  })
}
