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
import { MergeRequestStatus, SeedType } from '@prisma/client'

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
      status: MergeRequestStatus.ACCEPTED,
    },
  })

  if (!request) {
    res.status(404).json({
      error: ['Request not found or not yet accepted'],
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
      error: ['Piece of seed not found'],
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

  // create a pure seed
  const pureSeed = await prisma.seed.create({
    data: {
      userId,
      type: SeedType.PURE_SEED,
    },
  })

  insertLog({
    logMessage: `Player ${userId} confirm and create a new pure seed with id of ${pureSeed.id}`,
    logType: 'UNKNOWN',
    userId,
  })

  res.status(200).json({
    message: 'Request accepted',
    data: {
      requestId: data.requestId,
    },
  })
}
