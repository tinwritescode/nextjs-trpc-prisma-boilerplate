import { NextApiHandler } from 'next'
import NextAuth from 'next-auth'
import GithubProvider from 'next-auth/providers/github'
import EmailProvider from 'next-auth/providers/email'
import { PrismaAdapter } from '@next-auth/prisma-adapter'
import { PrismaClient, User } from '@prisma/client'
import { sendVerificationRequest } from '../../../utils/emailTemplate'

const prisma = new PrismaClient()

const auth: NextApiHandler = (req, res) =>
  NextAuth(req, res, {
    providers: [
      GithubProvider({
        clientId: process.env.GITHUB_ID,
        clientSecret: process.env.GITHUB_SECRET,
      }),
      EmailProvider({
        server: process.env.EMAIL_SERVER,
        from: process.env.EMAIL_FROM,
        async generateVerificationToken() {
          // gen random 6 digit code
          return Math.floor(Math.random() * 1000000)
            .toString()
            .padStart(6, '0')
        },
        sendVerificationRequest,
      }),
    ],
    secret: process.env.JWT_SECRET,
    session: {
      strategy: 'jwt',
    },
    callbacks: {
      session: async ({ session, user }) => {
        // session.user.id = user.id

        return session
      },
      jwt: async ({ token, user }) => {
        const { role, id } = token

        if (!role) {
          const { id, role } = user as User

          return { role, id }
        }

        return { role, id }
      },
    },
    // Prisma adapter returns for User `id` string instead of `number`
    // @ts-ignore
    adapter: PrismaAdapter(prisma),
  })

export default auth
export { prisma }
