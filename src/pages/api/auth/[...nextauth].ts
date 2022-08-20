import { NextApiHandler } from 'next'
import NextAuth, { NextAuthOptions, SessionStrategy } from 'next-auth'
import GithubProvider from 'next-auth/providers/github'
import EmailProvider from 'next-auth/providers/email'
import FacebookProvider from 'next-auth/providers/facebook'
import { PrismaAdapter } from '@next-auth/prisma-adapter'
import { PrismaClient, User, Role } from '@prisma/client'
import { sendVerificationRequest } from '../../../utils/emailTemplate'

export const SECRET = process.env.JWT_SECRET || 'Ch@ng3M3S3cr3t'

const prisma = new PrismaClient()

export const nextAuthOptions: NextAuthOptions = {
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
    FacebookProvider({
      clientId: process.env.FACEBOOK_ID,
      clientSecret: process.env.FACEBOOK_SECRET,
    }),
  ],
  secret: process.env.JWT_SECRET as string,
  session: {
    strategy: 'jwt',
  },
  callbacks: {
    jwt: async ({ token, user }) => {
      if (user) {
        token.role = (user?.role || 'USER') as Role
        token.email = user?.email
        token.id = user?.id
      }

      return token
    },
    session: async ({ session, token }) => {
      session.user.id = token.id
      session.user.email = token.email
      session.user.role = token.role

      return session
    },
  },
  // Prisma adapter returns for User `id` string instead of `number`
  // @ts-ignore
  adapter: PrismaAdapter(prisma),
}

const auth: NextApiHandler = (req, res) => NextAuth(req, res, nextAuthOptions)

export default auth
export { prisma }
