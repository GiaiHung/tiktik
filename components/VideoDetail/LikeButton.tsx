import React, { useState, useEffect } from 'react'
import { MdFavorite } from 'react-icons/md'
import useAuthStore from '../../store/authState'

interface Props {
  handleLike: () => void
  handleDislike: () => void
  likes: any[]
}

function LikeButton({ likes, handleLike, handleDislike }: Props) {
  const [alreadyLiked, setAlreadyLiked] = useState(false)
  const { userProfile }: any = useAuthStore()
  const filterLikes = likes?.filter((item) => item._ref === userProfile?._id)

  useEffect(() => {
    if(filterLikes?.length > 0) {
      setAlreadyLiked(true)
    } else {
      setAlreadyLiked(false)
    }
  }, [likes, filterLikes])

  return (
    <div className="flex gap-4 items-center">
      <div className="p-3 bg-gray-300 rounded-full cursor-pointer">
        {!alreadyLiked ? (
          <div className="text-lg text-black" onClick={handleLike}>
            <MdFavorite />
          </div>
        ) : (
          <div className="text-lg text-red-500" onClick={handleDislike}>
            <MdFavorite />
          </div>
        )}
      </div>

      <p className="font-semibold">{likes?.length || 0}</p>
    </div>
  )
}

export default LikeButton
