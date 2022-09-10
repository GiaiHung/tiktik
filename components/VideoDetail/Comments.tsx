import axios from 'axios'
import React, { Dispatch, SetStateAction, useState } from 'react'
import useAuthStore from '../../store/authState'
import { Video } from '../../types'
import NoResults from '../NoResults'

interface Props {
  post: Video
  setPost: Dispatch<SetStateAction<Video>>
}

function Comments({ post, setPost }: Props) {
  const [comment, setComment] = useState<string>('')
  const [isPosting, setIsPosting] = useState<boolean>(false)

  const comments = []
  const { userProfile }: any = useAuthStore()

  const addComment = async (e: any) => {
    e.preventDefault()

    if (userProfile && comment) {
      console.log('Hello');
      
      setIsPosting(true)

      const res = await axios.put(`${process.env.NEXT_PUBLIC_BASE_URL}/api/post/${post._id}`, {
        userId: userProfile._id,
        comment,
      })

      setPost({ ...post, comments: res.data.comments })
      setComment('')
      setIsPosting(false)
    }
  }

  return (
    <div>
      <div className="border-t border-b border-gray-200 mt-3 mr-6 pt-2 pb-[100px] bg-gray-100">
        <div className="h-[200px] overflow-scroll">
          {comments.length > 0 ? (
            <div>Comments</div>
          ) : (
            <NoResults text="Be the first to comment!" />
          )}
        </div>
      </div>

      <form className="flex items-center gap-4" onSubmit={addComment}>
        <input
          className="bg-gray-200 px-3 py-2 my-2 rounded-lg outline-none border border-gray-200 w-[400px] focus:border focus:border-gray-500"
          type="text"
          placeholder="Add comment"
          value={comment}
          onChange={(e) => setComment(e.target.value)}
        />
        <p
          className={`p-2 ${
            comment.trim().length > 0 ? 'text-green-500 cursor-pointer' : 'text-gray-400'
          }`}
          onClick={addComment}
        >
          {isPosting ? 'Posting...' : 'Post'}
        </p>
      </form>
    </div>
  )
}

export default Comments
