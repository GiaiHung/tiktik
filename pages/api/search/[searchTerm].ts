import { NextApiRequest, NextApiResponse } from 'next'
import { client } from '../../../utils/client'
import { searchPostsQuery, topicPostsQuery } from '../../../utils/queries'

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { searchTerm } = req.query
    const searchQuery = searchPostsQuery(searchTerm)
    const data = await client.fetch(searchQuery)

    res.status(200).json(data)
}
