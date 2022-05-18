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
import { MergeRequestStatus } from '@prisma/client'

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const token = await getToken({ req, secret: SECRET })
  const session = await getSession({ req })

  assertMethodIsPost(req, res), assertIsPlayerLoggedIn(req, res)

  const userId: string = token.id
  const data = {
    requestId: req.body.requestId as string,
  }

  const request = await prisma.mergeRequest.findFirst({
    where: {
      id: data.requestId,
      status: MergeRequestStatus.PENDING,
    },
  })

  if (!request) {
    res.status(404).json({
      error: ['Request not found'],
    })
    return
  }

  const pieceOfSeed = await prisma.seed.findFirst({
    where: {
      userId,
    },
  })
  if (!pieceOfSeed) {
    res.status(404).json({
      error: ['You do not have a Piece of seed'],
    })
    return
  }
  if (pieceOfSeed.used) {
    res.status(400).json({
      error: ['Piece of seed already used'],
    })
    return
  }

  //update request as accepted
  await prisma.mergeRequest.update({
    where: {
      id: data.requestId,
    },
    data: {
      status: MergeRequestStatus.ACCEPTED,
    },
  })
  await prisma.seed.update({
    where: {
      id: pieceOfSeed.id,
    },
    data: {
      used: true,
    },
  })
  insertLog({
    logMessage: `Player ${userId} accepted merge request ${data.requestId}`,
    logType: 'MERGE_ACCEPTED',
    userId,
  })

  res.status(200).json({
    message: 'Request accepted',
    data: {
      requestId: data.requestId,
    },
  })
}
