/* eslint-disable @next/next/no-img-element */
import React, { useEffect, useRef, useState } from 'react'
import { NextPage } from 'next'
import Image from 'next/image'
import Link from 'next/link'
import { HiVolumeUp, HiVolumeOff } from 'react-icons/hi'
import { BsFillPlayFill, BsFillPauseFill } from 'react-icons/bs'
import { GoVerified } from 'react-icons/go'
import { BsPlay } from 'react-icons/bs'
import { MdFavorite } from 'react-icons/md'
import { FaCommentDots } from 'react-icons/fa'

import { Video } from './../types'
import useAuthStore from '../store/authState'
import axios from 'axios'

interface Props {
  post: Video
}

const VideoCard: NextPage<Props> = ({ post: postO }) => {
  const [post, setPost] = useState(postO)
  const [isHover, setIsHover] = useState<boolean>(false)
  const [isPlaying, setIsPlaying] = useState<boolean>(false)
  const [isMuted, setIsMuted] = useState<boolean>(true)
  const videoRef = useRef<HTMLVideoElement>(null)

  const { userProfile }: any = useAuthStore()

  const [alreadyLiked, setAlreadyLiked] = useState(false)

  const onVideoPress = () => {
    if (isPlaying) {
      videoRef?.current?.pause()
      setIsPlaying(false)
    } else {
      videoRef?.current?.play()
      setIsPlaying(true)
    }
  }

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
    if (post && videoRef.current) {
      videoRef.current.muted = isMuted
    }
  }, [isMuted, post])

  const { _id, caption, comments, postedBy, likes, video } = post
  const filterLikes = likes?.filter((item) => item._ref === userProfile?._id)

  useEffect(() => {
    if (filterLikes?.length > 0) {
      setAlreadyLiked(true)
    } else {
      setAlreadyLiked(false)
    }
  }, [likes, filterLikes])

  return (
    <div className="flex flex-col gap-6 border-b-2 border-gray-200 pb-6">
      {/* Video header */}
      <div>
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
      </div>

      {/* Video */}
      <div className="flex gap-4 relative md:ml-6">
        <div
          className="rounded-3xl overflow-hidden mx-auto md:mx-0"
          onMouseEnter={() => setIsHover(true)}
          onMouseLeave={() => setIsHover(false)}
        >
          <Link href={`/detail/${_id}`}>
            <video
              src={video.asset.url}
              ref={videoRef}
              loop
              className="lg:w-[600px] lg:h-[528px] md:h-[400px] h-[300px] w-[200px] rounded-2xl cursor-pointer bg-gray-200"
            ></video>
          </Link>

          {/* Number of likes and comments */}
          <div className="absolute right-[3%] bottom-20 flex flex-col items-center lg:right-[10%]">
            <div
              className="flex flex-col items-center p-2 rounded-full bg-gray-300 cursor-pointer"
            >
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
            <div
              className="flex flex-col items-center p-2 rounded-full bg-gray-300 cursor-pointer"
              onClick={() => {}}
            >
              <FaCommentDots className="text-xl" />
            </div>
            <p className="font-semibold text-md text-gray-500 mb-4">{comments?.length || 0}</p>
          </div>

          {isHover && (
            <div className="flex gap-4 text-white">
              <div className="absolute top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%] md:left-[40%]">
                {isPlaying ? (
                  <button onClick={onVideoPress}>
                    <BsFillPauseFill className="text-2xl md:text-4xl cursor-pointer" />
                  </button>
                ) : (
                  <button onClick={onVideoPress}>
                    <BsFillPlayFill className="text-2xl md:text-4xl cursor-pointer" />
                  </button>
                )}
              </div>
              <div className="absolute bottom-6 right-[20%] text-black md:right-[25%]">
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
