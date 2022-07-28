import { NextApiRequest, NextApiResponse } from 'next'
import {
  assertIsPlayerLoggedIn,
  assertMethodIsGet,
} from '../../../utils/apiUtils'

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    await assertMethodIsGet(req, res)
    const { token, session } = await assertIsPlayerLoggedIn(req, res)

    console.log('token', token)

    res.status(200).json({ ok: 'okl' })
  } catch (error) {
    res.status(error.statusCode).json(error.serialize())
  }
}
