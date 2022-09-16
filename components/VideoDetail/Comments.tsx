/* eslint-disable @next/next/no-img-element */
import axios from 'axios'
import React, { Dispatch, SetStateAction } from 'react'
import useAuthStore from '../../store/authState'
import { CommentI, UserI, Video } from '../../types'
import NoResults from '../NoResults'

interface Props {
  comments: CommentI[]
  comment: string
  isPosting: boolean
  setComment: Dispatch<SetStateAction<string>>
  addComment: (e: React.FormEvent) => void
}

function Comments({ comments, comment, isPosting, setComment, addComment }: Props) {
  const { allUsers, userProfile }: any = useAuthStore()

  return (
    <div>
      <div className="lg:border-t lg:border-b border-gray-200 mt-3 pt-4 lg:pl-12 bg-white lg:bg-gray-100">
        <div className="h-[250px] overflow-scroll">
          {comments?.length > 0 ? (
            <div>
              {comments?.map((comment: CommentI) => (
                <>
                  {allUsers?.map(
                    (user: UserI) =>
                      user._id === (comment.postedBy._ref || comment.postedBy._id) && (
                        <div className="flex gap-2 mb-6">
                          <img
                            src={user.image}
                            alt=""
                            className="object-cover cursor-pointer rounded-full w-10 h-10"
                          />

                          <div className="flex flex-col">
                            <p className="font-bold text-md">{user.userName}</p>
                            <p className="text-md">{comment.comment}</p>
                          </div>
                        </div>
                      )
                  )}
                </>
              ))}
            </div>
          ) : (
            <NoResults text="Be the first to comment!" />
          )}
        </div>
      </div>

      {userProfile && (
        <form
          className="flex items-center gap-4 lg:ml-10 lg:mt-4 sticky bottom-0 z-50 bg-white"
          onSubmit={addComment}
        >
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
      )}
    </div>
  )
}

export default Comments
