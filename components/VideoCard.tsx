/* eslint-disable @next/next/no-img-element */
import React, { useEffect, useRef, useState } from 'react'
import { NextPage } from 'next'
import Link from 'next/link'
import { HiVolumeUp, HiVolumeOff } from 'react-icons/hi'
import { BsFillPlayFill, BsFillPauseFill } from 'react-icons/bs'
import { MdFavorite } from 'react-icons/md'
import { FaCommentDots } from 'react-icons/fa'

import { Video } from './../types'
import useAuthStore from '../store/authState'
import axios from 'axios'
import VideoHeader from './VideoHeader'

interface Props {
  post: Video
  header?: boolean
  social?: boolean
  center?: boolean
}

const VideoCard: NextPage<Props> = ({ post: postO, header, social }) => {
  const [post, setPost] = useState(postO)
  const [isHover, setIsHover] = useState<boolean>(false)
  const [alreadyLiked, setAlreadyLiked] = useState<boolean>(false)
  const [isPlaying, setIsPlaying] = useState<boolean>(false)
  const [isMuted, setIsMuted] = useState<boolean>(false)
  const videoRef = useRef<HTMLVideoElement>(null)

  const { userProfile }: any = useAuthStore()

  const { _id, caption, comments, postedBy, likes, video } = post
  const isUserLiked = likes?.filter((item) => item._ref === userProfile?._id)

  // Play, pause
  const handlePlayPause = () => {
    if (isPlaying) {
      videoRef?.current?.pause()
      setIsPlaying(false)
    } else {
      videoRef?.current?.play()
      setIsPlaying(true)
    }
  }

  // Volume
  useEffect(() => {
    if (post && videoRef.current) {
      videoRef.current.muted = isMuted
    }
  }, [post, isMuted])

  // Like
  const handleLike = async (like: boolean) => {
    if (userProfile) {
      const { data } = await axios.put(`${process.env.NEXT_PUBLIC_BASE_URL}/api/like`, {
        userId: userProfile._id,
        postId: post._id,
        like,
      })

      setPost({ ...post, likes: data.likes })
    }
  }

  useEffect(() => {
    if (isUserLiked?.length > 0) {
      setAlreadyLiked(true)
    } else {
      setAlreadyLiked(false)
    }
  }, [likes, isUserLiked])

  return (
    <div className="flex flex-col gap-6 border-b-2 border-gray-200 pb-6">
      {header && <VideoHeader postedBy={postedBy} caption={caption} center />}

      {/* Video */}
      <div className="flex gap-4 relative md:ml-6">
        <div
          className="rounded-3xl overflow-hidden mx-auto md:mx-0"
          onMouseEnter={() => setIsHover(true)}
          onMouseLeave={() => setIsHover(false)}
        >
          <Link href={`/detail/${_id}`}>
            <video
              ref={videoRef}
              src={video.asset.url}
              loop
              className="lg:w-[600px] lg:h-[528px] md:h-[400px] h-[300px] w-[200px] rounded-2xl cursor-pointer bg-gray-200"
            ></video>
          </Link>

          {/* Number of likes and comments */}
          {social && userProfile && (
            <div className="absolute right-[3%] bottom-20 flex flex-col items-center lg:right-[10%]">
              <div className="flex flex-col items-center p-2 rounded-full bg-gray-300 cursor-pointer">
                {/* Likes */}
                {!alreadyLiked ? (
                  <div className="text-lg text-black" onClick={() => handleLike(true)}>
                    <MdFavorite />
                  </div>
                ) : (
                  <div className="text-lg text-red-500" onClick={() => handleLike(false)}>
                    <MdFavorite />
                  </div>
                )}
              </div>
              <p className="font-semibold text-md text-gray-500 mb-4">{likes?.length || 0}</p>

              {/* Comments */}
              <Link href={`/detail/${_id}`}>
                <div>
                  <div className="flex flex-col items-center p-2 rounded-full bg-gray-300 cursor-pointer">
                    <FaCommentDots className="text-xl" />
                  </div>
                  <p className="font-semibold text-md text-gray-500 mb-4 text-center">
                    {comments?.length || 0}
                  </p>
                </div>
              </Link>
            </div>
          )}

          {/* Play, pause and volume */}
          {isHover && (
            <div className="hidden text-white lg:block">
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 md:left-[40%]">
                {isPlaying ? (
                  <button onClick={handlePlayPause}>
                    <BsFillPauseFill className="text-2xl md:text-4xl cursor-pointer" />
                  </button>
                ) : (
                  <button onClick={handlePlayPause}>
                    <BsFillPlayFill className="text-2xl md:text-4xl cursor-pointer" />
                  </button>
                )}
              </div>
              <div className="absolute bottom-6 right-[10%] text-black">
                {isMuted ? (
                  <button onClick={() => setIsMuted(false)}>
                    <HiVolumeOff className="text-2xl md:text-4xl cursor-pointer" />
                  </button>
                ) : (
                  <button onClick={() => setIsMuted(true)}>
                    <HiVolumeUp className="text-2xl md:text-4xl cursor-pointer" />
                  </button>
                )}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default VideoCard
