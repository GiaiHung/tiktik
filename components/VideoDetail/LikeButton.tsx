import React, { useState, useEffect } from 'react'
import { MdFavorite } from 'react-icons/md'
import useAuthStore from '../../store/authState'

interface Props {
    handleLike: () => void
    handleDislike: () => void
}

function LikeButton({handleLike, handleDislike}: Props) {
  const [isAlreadyLiked, setIsAlreadyLiked] = useState(false)
  const { userProfile } = useAuthStore()

  return (
    <div className="flex gap-4 items-center">
      <div className="p-3 bg-gray-300 rounded-full cursor-pointer">
        {!isAlreadyLiked ? (
          <div className="text-lg text-black" onClick={handleLike}>
            <MdFavorite />
          </div>
        ) : (
          <div className="text-lg text-red-500" onClick={handleDislike}>
            <MdFavorite />
          </div>
        )}
      </div>
    </div>
  )
}

export default LikeButton
