/* eslint-disable @next/next/no-img-element */
import Link from 'next/link'
import React from 'react'
import { GoVerified } from 'react-icons/go'

interface Props {
  postedBy: {
    _id: string
    userName: string
    image: string
  }
  caption: string
}

function VideoHeader({ postedBy, caption }: Props) {
  return (
    <div className="flex gap-3 rounded-lg p-3 cursor-pointer">
      {/* Avatar */}
      <Link href={`/profile/${postedBy._id}`}>
        <div className="flex gap-4">
          <img
            src={postedBy.image}
            alt=""
            className="rounded-full w-10 h-10 md:w-14 md:h-14 object-cover"
          />

          {/* User name and caption */}
          <div>
            <div className="flex gap-2 items-center">
              <p className="text-md md:text-lg font-bold">{postedBy.userName}</p>
              <GoVerified className="text-md text-blue-500" />
            </div>
            <p className="text-lg text-gray-700 break-normal">{caption}</p>
          </div>
        </div>
      </Link>
    </div>
  )
}

export default VideoHeader
