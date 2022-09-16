import { NextApiRequest, NextApiResponse } from 'next'
import { client } from '../../../../utils/client'
import { singleUserQuery, userCreatedPostsQuery } from '../../../../utils/queries'

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'GET') {
    const { userId } = req.query

    const userQuery = singleUserQuery(userId)
    const userVideosQuery = userCreatedPostsQuery(userId)

    const user = await client.fetch(userQuery)
    const userVideos = await client.fetch(userVideosQuery)

    res.status(200).json({ user: user[0], userVideos })
  }
}
