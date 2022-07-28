import { LogType } from '@prisma/client'
import { NextApiRequest, NextApiResponse } from 'next'
import { getToken, JWT } from 'next-auth/jwt'
import { getSession } from 'next-auth/react'
import { prisma } from '../pages/api/auth/[...nextauth]'
import { apiConstant } from './apiConstant'
import { Session } from 'next-auth'

export const SECRET = process.env.JWT_SECRET || 'Ch@ng3M3S3cr3t'

export class APIError extends Error {
  constructor(message: string, public statusCode: number) {
    super(message)
  }

  serialize = (): object => {
    return {
      message: this.message,
      statusCode: this.statusCode,
    }
  }
}

export const assertMethodIsPost = (
  req: NextApiRequest,
  res: NextApiResponse
) => {
  return new Promise<void>((resolve, reject) => {
    if (req.method !== 'POST') {
      reject(new APIError(apiConstant.methodNotAllowed, 405))
    }
    resolve()
  })
}

export const assertMethodIsGet = async (
  req: NextApiRequest,
  res: NextApiResponse
) => {
  return new Promise<void>((resolve, reject) => {
    if (req.method !== 'GET') {
      reject(new APIError(apiConstant.methodNotAllowed, 405))
    }
    resolve()
  })
}

export const assertIsPlayerLoggedIn = async (
  req: NextApiRequest,
  res: NextApiResponse
) => {
  const token = await getToken({ req, secret: SECRET })
  const session = await getSession({ req })

  return new Promise<{ token: JWT; session: Session }>((resolve, reject) => {
    if (!session || !token) {
      reject(new APIError(apiConstant.notLoggedIn, 401))
    }

    resolve({ token, session })
  })
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
