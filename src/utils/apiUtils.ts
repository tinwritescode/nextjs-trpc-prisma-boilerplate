import { LogType } from '@prisma/client'
import { NextApiRequest, NextApiResponse } from 'next'
import { getToken } from 'next-auth/jwt'
import { getSession } from 'next-auth/react'
import { prisma } from '../pages/api/auth/[...nextauth]'
import { apiConstant } from './apiConstant'

export const SECRET = process.env.JWT_SECRET || 'Ch@ng3M3S3cr3t'

export const assertMethodIsPost = (
  req: NextApiRequest,
  res: NextApiResponse
) => {
  if (req.method !== 'POST') {
    res.status(405).json({ errors: [apiConstant.methodNotAllowed] })
    return
  }
}

export const assertMethodIsGet = (
  req: NextApiRequest,
  res: NextApiResponse
) => {
  if (req.method !== 'GET') {
    res.status(405).json({ errors: [apiConstant.methodNotAllowed] })
    return
  }
}

export const assertIsPlayerLoggedIn = async (
  req: NextApiRequest,
  res: NextApiResponse
) => {
  const token = await getToken({ req, secret: SECRET })
  const session = await getSession({ req })

  if (!session || !token) {
    res.status(401).json({ errors: [apiConstant.notLoggedIn] })
    return
  }
}

export const insertLog = async ({
  logType,
  logMessage,
  userId,
}: {
  logType: LogType
  logMessage: string
  userId: string
}) => {
  const log = await prisma.log.create({
    data: {
      user: {
        connect: {
          id: userId,
        },
      },
      message: logMessage,
      type: logType,
    },
  })
  return log
}
