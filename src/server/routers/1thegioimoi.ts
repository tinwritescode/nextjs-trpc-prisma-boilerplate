/**
 *
 * This is an example router, you can delete this file and then update `../pages/api/trpc/[trpc].tsx`
 */
import { Prisma } from '@prisma/client'
import { TRPCError } from '@trpc/server'
import { z } from 'zod'
import { createRouter } from '~/server/createRouter'
import { prisma } from '~/server/prisma'
import Crawler from 'crawler'

const c = new Crawler({
  maxConnections: 10,
  // This will be called for each crawled page
  callback: (error, res, done) => {
    if (error) {
      console.log(error)
    } else {
      const $ = res.$
      // $ is Cheerio by default
      //a lean implementation of core jQuery designed specifically for the server
      console.log($('title').text())
    }
    done()
  },
})

/**
 * Default selector for User.
 * It's important to always explicitly say which fields you want to return in order to not leak extra information
 * @see https://github.com/prisma/prisma/issues/9353
 */
const defaultPostSelect = Prisma.validator<Prisma.UserSelect>()({
  id: true,
  name: true,
  role: true,
  image: true,
  createdAt: true,
  updatedAt: true,
})

export const thegioimoiRouter = createRouter().query('byCategory', {
  input: z.object({
    category: z.string().default('girl-xinh-mto'),
    page: z.number().default(1),
  }),
  async resolve({ ctx, input: { page, category } }) {
    /**
     * For pagination you can have a look at this docs site
     * @link https://trpc.io/docs/useInfiniteQuery
     */

    // https://1thegioimoi.com/category/girl-xinh-mto/page/1/

    const website =
      `https://1thegioimoi.com/category/${category}` +
      (page !== 1 ? `/page/${page}` : '')

    return new Promise((resolve, reject) => {
      c.queue({
        uri: website,
        callback(err, res, done) {
          const $ = res.$

          const postList = $('#posts-container')
            .find('a')
            .map((i, el) => {
              return $(el).attr('href')
            })
            .get()
            .filter((val) => !val.includes('/author/'))

          resolve(postList)
        },
        err: reject,
      })
    })
  },
})
