import type { NextApiRequest, NextApiResponse } from 'next'
import { client } from '../../../utils/client'
import { searchPostsQuery } from '../../../utils/queries'

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'GET') {
    const { searchTerm } = req.query
    const searchQuery = searchPostsQuery(searchTerm)

    const data = await client.fetch(searchQuery)

    res.status(200).json(data)
  }
}
