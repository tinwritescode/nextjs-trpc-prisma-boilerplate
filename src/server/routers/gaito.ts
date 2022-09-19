import { createRouter } from '../createRouter'
import { z } from 'zod'
import { AxiosResponse } from 'axios'
import { Gai, Review } from '~/types/gaito'
import axios from 'axios'
import { ReviewDetailResponse } from '~/types/gaito_review_detail'

const gaitoRouter = createRouter()
  .query('getGaito', {
    input: z.object({
      page: z.number(),
      limit: z.number().default(20),
      byReport: z.boolean().default(false),
    }),
    resolve: async ({ input: { page, limit, byReport } }) => {
      const URL = `https://api.gaito.xyz/escort/products?cityCode=H%E1%BB%93+Ch%C3%AD+Minh&mode=directory&orderBy=${
        byReport ? 'byRated' : 'byTime'
      }&offset=${page * limit}&limit=${limit}`

      const response: AxiosResponse<Gai[]> = await axios.get(URL)

      return response.data
    },
  })
  .query('getReviews', {
    input: z.object({
      page: z.number().default(1),
      limit: z.number().default(5),
      entityId: z.string(),
    }),
    resolve: async ({ input: { page, limit, entityId } }) => {
      const URL = `https://api.gaito.xyz/escort/reviews?entityId=${entityId}&entityType=product&includeAuthor=true&orderBy=latest&plugin=escort&rpp=${limit}&page=${page}`

      const response: AxiosResponse<Review[]> = await axios.get(URL)

      return (
        await Promise.all(
          response.data.map(async (review) => {
            //https://api.gaito.xyz/escort/reviews/278584
            return await axios.get<ReviewDetailResponse>(
              `https://api.gaito.xyz/escort/reviews/${review.id}`,
              { timeout: 5000 }
            )
          })
        )
      ).map((res) => res.data.data.review)
    },
  })

export { gaitoRouter }
