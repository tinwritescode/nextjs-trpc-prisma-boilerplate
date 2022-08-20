import jwt from 'jsonwebtoken'

declare global {
  namespace NodeJS {
    interface ProcessEnv {
      DATABASE_URL: string
      GITHUB_ID: string
      GITHUB_SECRET: string
      EMAIL_FROM: string
      EMAIL_SERVER: string
      JWT_SECRET: jwt.Secret
      NEXTAUTH_URL: string
      NO_PEER_DEPENDENCY_CHECK: 'true' | '1' | 'false' | '0'
      PEER_DEPENDENCY_CHECK: 'true' | '1' | 'false' | '0'
      FACEBOOK_ID: string
      FACEBOOK_SECRET: string
    }
  }
}
