import Link from 'next/link'
import { useRouter } from 'next/router'
import React from 'react'
import { Video } from '../../types'
import NoResults from '../NoResults'
import VideoCard from '../VideoCard'

interface Props {
  videosList: Video[]
  liked?: boolean
  videos?: boolean
}

function Main({ videosList, liked, videos }: Props) {
  const router = useRouter()

  return (
    <div>
      <div className="flex gap-4 mt-6 mb-10 ml-2 border-b-2 border-gray-200">
        <Link href={`/profile/${router.query.userId}/like`}>
          <button
            className={`cursor-pointer text-lg font-bold ${
              liked ? 'border-b-2 border-black text-black' : 'text-gray-400 border-gray-200'
            }`}
          >
            Liked
          </button>
        </Link>
        <Link href={`/profile/${router.query.userId}/videos`}>
          <button
            className={`cursor-pointer text-lg font-bold ${
              videos ? 'border-b-2 border-black text-black' : 'text-gray-400 border-gray-200'
            }`}
          >
            Videos
          </button>
        </Link>
      </div>

      <div className="flex flex-gap-6 flex-wrap justify-center md:justify-start">
        {videosList.length > 0 ? (
          videosList.map((post: Video, idx: number) => <VideoCard key={idx} post={post} />)
        ) : (
          <NoResults text={`No ${!liked ? '' : 'Liked'} Videos Yet`} />
        )}
      </div>
    </div>
  )
}

export default Main
