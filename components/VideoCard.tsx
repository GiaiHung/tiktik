/* eslint-disable @next/next/no-img-element */
import React, { useEffect, useRef, useState } from 'react'
import { NextPage } from 'next'
import Image from 'next/image'
import Link from 'next/link'
import { HiVolumeUp, HiVolumeOff } from 'react-icons/hi'
import { BsFillPlayFill, BsFillPauseFill } from 'react-icons/bs'
import { GoVerified } from 'react-icons/go'
import { BsPlay } from 'react-icons/bs'

import { Video } from './../types'

interface Props {
  post: Video
}

const VideoCard: NextPage<Props> = ({ post }) => {
  const [isHover, setIsHover] = useState<boolean>(false)
  const [isPlaying, setIsPlaying] = useState<boolean>(false)
  const [isMuted, setIsMuted] = useState<boolean>(false)
  const videoRef = useRef<HTMLVideoElement>(null)

  const onVideoPress = () => {
    if (isPlaying) {
      videoRef?.current?.pause()
      setIsPlaying(false)
    } else {
      videoRef?.current?.play()
      setIsPlaying(true)
    }
  }

  const { caption, comments, postedBy, likes, video } = post

  return (
    <div className="flex flex-col border-b-2 border-gray-200 pb-6">
      {/* Video header */}
      <div>
        <div className="flex gap-3 rounded-lg p-3 cursor-pointer">
          {/* Avatar */}
          <Link href="">
            <>
              <img
                src={postedBy.image}
                alt=""
                className="rounded-full w-10 h-10 md:w-14 md:h-14 object-cover"
              />
            </>
          </Link>
          {/* User name and caption */}
          <Link href="">
            <div>
              <div className="flex gap-2 items-center">
                <p className="text-md md:text-lg font-bold">{postedBy.userName}</p>
                <GoVerified className="text-md text-blue-500" />
              </div>
              <p className="text-lg text-gray-700 break-normal">{caption}</p>
            </div>
          </Link>
        </div>
      </div>

      {/* Video */}
      <div className="flex gap-4 relative">
        <div
          className="rounded-3xl overflow-hidden mx-auto"
          onMouseEnter={() => setIsHover(true)}
          onMouseLeave={() => setIsHover(false)}
        >
          <Link href="">
            <video
              src={video.asset.url}
              ref={videoRef}
              loop
              className="lg:w-[600px] lg:h-[528px] md:h-[400px] h-[300px] w-[200px] rounded-2xl cursor-pointer bg-gray-100"
            ></video>
          </Link>

          {isHover && (
            <div className="absolute bottom-6 flex gap-4">
              {isPlaying ? (
                <button onClick={onVideoPress}>
                  <BsFillPauseFill className="text-black text-2xl md:text-4xl cursor-pointer" />
                </button>
              ) : (
                <button onClick={onVideoPress}>
                  <BsFillPlayFill className="text-black text-2xl md:text-4xl cursor-pointer" />
                </button>
              )}
              {isMuted ? (
                <button onClick={() => setIsMuted(false)}>
                  <HiVolumeOff className="text-black text-2xl md:text-4xl cursor-pointer" />
                </button>
              ) : (
                <button onClick={() => setIsMuted(true)}>
                  <HiVolumeUp className="text-black text-2xl md:text-4xl cursor-pointer" />
                </button>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default VideoCard
