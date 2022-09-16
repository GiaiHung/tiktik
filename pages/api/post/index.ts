import { NextApiRequest, NextApiResponse } from 'next'
import { client } from '../../../utils/client'
import { allPostsQuery } from '../../../utils/queries'

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'GET') {
    const data = await client.fetch(allPostsQuery())

    res.status(200).json(data)
  } else if (req.method === 'POST') {
    const document = req.body

    await client.create(document).then(() => res.status(201).json('Video uploaded'))
  }
}
