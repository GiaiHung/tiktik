import { NextApiRequest, NextApiResponse } from 'next'
import { v4 } from 'uuid'
import { client } from '../../../utils/client'
import { postDetailQuery } from '../../../utils/queries'

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'GET') {
    const { id } = req.query
    const query = postDetailQuery(id)
    const data = await client.fetch(query)

    res.status(200).json(data[0])
  } else if (req.method === 'PUT') {
    const { userId, comment } = req.body
    const { id }: any = req.query

    const data = await client
      .patch(id)
      .setIfMissing({ comments: [] })
      .insert('after', 'comments[-1]', [
        {
          comment,
          postedBy: {
            _type: 'postedBy',
            _ref: userId,
          },
          _key: v4(),
        },
      ])
      .commit()

    res.status(200).json(data)
  }
}
