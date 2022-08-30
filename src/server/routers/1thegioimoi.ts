/**
 *
 * This is an example router, you can delete this file and then update `../pages/api/trpc/[trpc].tsx`
 */
import { Prisma } from '@prisma/client'
import Crawler from 'crawler'
import { z } from 'zod'
import { createRouter } from '~/server/createRouter'

const c = new Crawler({
  maxConnections: 40,
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

export const thegioimoiRouter = createRouter()
  .query('byCategory', {
    input: z.object({
      category: z.string().default('girl-xinh-mto'),
      page: z.number().default(1),
      withImage: z.boolean().default(false),
      limit: z.number().default(10),
    }),
    async resolve({ ctx, input: { page, limit, category, withImage } }) {
      /**
       * For pagination you can have a look at this docs site
       * @link https://trpc.io/docs/useInfiniteQuery
       */

      // https://1thegioimoi.com/category/girl-xinh-mto/page/1/

      const website =
        `https://1thegioimoi.com/category/${category}` +
        (page !== 1 ? `/page/${page}` : '')

      console.log('Fetching ' + website)

      return new Promise<{ url: string; image: string[] }[]>(
        (resolve, reject) => {
          c.queue({
            uri: website,
            async callback(err, res, done) {
              const $ = res.$

              const postList = $('#posts-container')
                .find('a')
                .map((i, el) => {
                  return $(el).attr('href')
                })
                .get()
                // .splice(0, limit)
                .filter((val) => !val.includes('/author/'))
                // remove duplicates
                .filter((val, i, arr) => arr.indexOf(val) === i)
                .slice(0, limit)

              if (withImage) {
                const imageList = await Promise.all(
                  postList.map((url) => getImageFromURL(url))
                )
                resolve(
                  postList.map((url, i) => ({
                    url,
                    image: imageList[i] as any,
                  }))
                )
              }

              resolve(postList)
            },
            err: reject,
          })
        }
      )
    },
  })
  .query('post', {
    input: z.object({
      url: z.string(),
    }),
    async resolve({ ctx, input: { url } }) {
      return getImageFromURL(url)
    },
  })

const getImageFromURL = async (url: string) => {
  return new Promise((resolve, reject) => {
    c.queue({
      uri: url,
      callback(err, res, done) {
        const $ = res.$

        const posts = $('#the-post')
          .find('img')
          .map((i, el) => {
            return $(el).attr('src')
          })
          .get()
          // 780x470
          .filter((val) => !val.includes('780x470'))
        resolve(posts)
      },
    })
  })
}
