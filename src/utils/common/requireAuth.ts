// @/src/common/requireAuth.ts
import type {
  GetServerSideProps,
  GetServerSidePropsContext,
  NextApiRequest,
  NextApiResponse,
} from 'next'
import { getServerSession } from 'next-auth'
import { nextAuthOptions } from '~/pages/api/auth/[...nextauth]'

export const requireAuth = (func: GetServerSideProps) => async (
  ctx: GetServerSidePropsContext
) => {
  const { req, res } = ctx
  const session = await getServerSession(
    {
      req: req as NextApiRequest,
      res: res as NextApiResponse,
    },
    nextAuthOptions
  )

  if (!session) {
    return {
      redirect: {
        destination: '/', // login path
        permanent: false,
      },
    }
  }

  return await func(ctx)
}
