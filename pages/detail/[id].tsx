/* eslint-disable @next/next/no-img-element */
import React, { useState, useEffect, useRef } from 'react'
import Head from 'next/head'
import axios from 'axios'
import { Video } from '../../types'

import { MdOutlineCancel } from 'react-icons/md'
import { BsFillPlayFill } from 'react-icons/bs'
import { HiVolumeUp, HiVolumeOff } from 'react-icons/hi'
import { useRouter } from 'next/router'
import Link from 'next/link'
import { GoVerified } from 'react-icons/go'
import useAuthStore from '../../store/authState'
import LikeButton from '../../components/VideoDetail/LikeButton'
import Comments from '../../components/VideoDetail/Comments'

interface Props {
  postDetails: Video
}

function Detail({ postDetails }: Props) {
  const router = useRouter()
  const [post, setPost] = useState(postDetails)
  const [playing, setPlaying] = useState<boolean>(false)
  const [isMuted, setIsMuted] = useState<boolean>(true)

  const videoRef = useRef<HTMLVideoElement>(null)
  const { userProfile }: any = useAuthStore()

  const onVideoClick = () => {
    if (playing) {
      videoRef?.current?.pause()
      setPlaying(false)
    } else {
      videoRef?.current?.play()
      setPlaying(true)
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

  if (!post) return null

  return (
    <>
      <Head>
        <title>Detail</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <div className="flex flex-col w-full h-full absolute left-0 top-0 bg-white flex-wrap lg:flex-nowrap lg:flex-row">
        <div className="relative w-full lg:w-7/12 flex-2 flex justify-center items-center bg-black mx-auto">
          {/* Close icon */}
          <div className="absolute top-6 left-6 z-50" onClick={() => router.back()}>
            <p className="text-2xl text-white cursor-pointer">
              <MdOutlineCancel />
            </p>
          </div>

          {/* Video */}
          <div className="relative">
            <div className="lg:h-[100vh] h-[60vh]">
              <video
                src={postDetails.video.asset.url}
                className="h-full cursor-pointer"
                ref={videoRef}
                onClick={onVideoClick}
              ></video>
            </div>

            {/* Play pause */}
            <div className="absolute left-[45%] top-[45%] cursor-pointer">
              {!playing && (
                <div>
                  <button onClick={onVideoClick}>
                    <BsFillPlayFill className="text-4xl lg:text-6xl text-white" />
                  </button>
                </div>
              )}
            </div>

            {/* Volume */}
            <div className="absolute right-5 bottom-5 text-white lg:bottom-10 lg:right-10">
              {isMuted ? (
                <button onClick={() => setIsMuted(false)}>
                  <HiVolumeOff className="text-3xl md:text-4xl cursor-pointer" />
                </button>
              ) : (
                <button onClick={() => setIsMuted(true)}>
                  <HiVolumeUp className="text-3xl md:text-4xl cursor-pointer" />
                </button>
              )}
            </div>
          </div>
        </div>

        {/* Comment and Like section */}
        <div className="w-full lg:w-5/12 bg-white">
          <div className="ml-10 mt-20">
            <div className="flex gap-3 rounded-lg p-3 cursor-pointer">
              <Link href="">
                <>
                  <img
                    src={post.postedBy.image}
                    alt=""
                    className="rounded-full w-10 h-10 md:w-14 md:h-14 object-cover"
                  />
                </>
              </Link>
              {/* User name and caption */}
              <Link href="">
                <div>
                  <div className="flex gap-2 items-center">
                    <p className="text-lg md:text-2xl font-bold">
                      {post.postedBy.userName.toLocaleLowerCase().split(' ').join('')}
                    </p>
                    <GoVerified className="text-md text-blue-500" />
                  </div>
                  <p className="text-sm text-gray-500 break-normal">{post.postedBy.userName}</p>
                </div>
              </Link>
            </div>

            <h2 className="text-700 text-lg p-3">{post.caption}</h2>

            {/* Like button */}
            <div className="mt-4 pl-3">
              {userProfile && (
                <LikeButton
                likes={post.likes}
                  handleLike={() => handleLike(true)}
                  handleDislike={() => handleLike(false)}
                />
              )}
            </div>

            {/* Comment */}
            <Comments post={post} setPost={setPost}/>
          </div>
        </div>
      </div>
    </>
  )
}

export async function getServerSideProps({ params: { id } }: { params: { id: string } }) {
  const { data } = await axios.get(`${process.env.NEXT_PUBLIC_BASE_URL}/api/post/${id}`)

  return {
    props: {
      postDetails: data,
    },
  }
}

export default Detail
