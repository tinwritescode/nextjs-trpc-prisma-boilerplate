/**
 * This file contains the root router of your tRPC-backend
 */
import { createRouter } from '../createRouter'
import superjson from 'superjson'
import { thegioimoiRouter } from './1thegioimoi'
import { userRouter } from './user'
import { tradeBookRouter } from './tradebook'
import { uploadcareRouter } from './uploadcare'
import { gaitoRouter } from './gaito'

/**
 * Create your application's root router
 * If you want to use SSG, you need export this
 * @link https://trpc.io/docs/ssg
 * @link https://trpc.io/docs/router
 */
export const appRouter = createRouter()
  /**
   * Add data transformers
   * @link https://trpc.io/docs/data-transformers
   */
  .transformer(superjson)
  /**
   * Optionally do custom error (type safe!) formatting
   * @link https://trpc.io/docs/error-formatting
   */
  // .formatError(({ shape, error }) => { })
  /**
   * Merge `postRouter` under `post.`
   */
  .merge('motthegioimoi.', thegioimoiRouter)
  .merge('user.', userRouter)
  .merge('tradebook.', tradeBookRouter)
  .merge('uploadcare.', uploadcareRouter)
  .merge('gaito.', gaitoRouter)

export type AppRouter = typeof appRouter
