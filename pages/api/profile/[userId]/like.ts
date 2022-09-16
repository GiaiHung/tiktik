import { NextApiRequest, NextApiResponse } from 'next'
import { client } from '../../../../utils/client'
import { singleUserQuery, userLikedPostsQuery } from '../../../../utils/queries'

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'GET') {
    const { userId } = req.query

    const userQuery = singleUserQuery(userId)
    const userLikedVideosQuery = userLikedPostsQuery(userId)

    const user = await client.fetch(userQuery)
    const userLikedVideos = await client.fetch(userLikedVideosQuery)

    res.status(200).json({ user: user[0], userLikedVideos })
  }
}
