import { createRouter } from '~/server/createRouter'
import { z } from 'zod'
import axios from 'axios'

const uploadcareRouter = createRouter().query('getImageByGroup', {
  input: z.object({
    group: z.string().min(1),
  }),
  resolve: async ({ input }) => {
    return axios
      .get(`https://api.uploadcare.com/groups/${input.group}/`, {
        headers: {
          Authorization: `Uploadcare.Simple ${process.env.NEXT_PUBLIC_UPLOADCARE_PUBLIC_KEY}:${process.env.UPLOADCARE_PRIVATE_KEY}`,
        },
      })
      .then((res) => res.data)
      .catch((err) => {
        console.error(err)
        return []
      })
  },
})

export { uploadcareRouter }
