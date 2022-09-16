/* eslint-disable @next/next/no-img-element */
import React, { useState, useEffect, useRef } from 'react'
import Head from 'next/head'
import axios from 'axios'
import { Video } from '../../types'

import { MdFavorite, MdOutlineCancel } from 'react-icons/md'
import { BsFillPlayFill } from 'react-icons/bs'
import { HiVolumeUp, HiVolumeOff } from 'react-icons/hi'
import { useRouter } from 'next/router'
import Link from 'next/link'
import { GoVerified } from 'react-icons/go'
import useAuthStore from '../../store/authState'
import LikeButton from '../../components/VideoDetail/LikeButton'
import Comments from '../../components/VideoDetail/Comments'
import { FaCommentDots } from 'react-icons/fa'

interface Props {
  postDetails: Video
}

function Detail({ postDetails }: Props) {
  const [post, setPost] = useState(postDetails)
  const [playing, setPlaying] = useState<boolean>(false)
  const [alreadyLiked, setAlreadyLiked] = useState<boolean>(false)
  const [isMuted, setIsMuted] = useState<boolean>(false)
  const [comment, setComment] = useState<string>('')
  const [isPosting, setIsPosting] = useState<boolean>(false)
  const [modal, setModal] = useState<boolean>(false)
  const videoRef = useRef<any>(null)

  const router = useRouter()
  const { userProfile }: any = useAuthStore()
  const isUserLiked = post.likes?.filter((item) => item._ref === userProfile?._id)

  const showModal = '!translate-y-0'

  // Play pause
  const onPlayPause = () => {
    if (playing) {
      videoRef.current.pause()
      setPlaying(false)
    } else {
      videoRef.current.play()
      setPlaying(true)
    }
  }

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

  // Comment
  const addComment = async (e: { preventDefault: () => void }) => {
    e.preventDefault()

    if (userProfile) {
      if (comment.trim().length > 0) {
        setIsPosting(true)
        const { data } = await axios.put(
          `${process.env.NEXT_PUBLIC_BASE_URL}/api/post/${post._id}`,
          {
            userId: userProfile._id,
            comment,
          }
        )

        setPost({ ...post, comments: data.comments })
        setComment('')
        setIsPosting(false)
      } else {
        alert('Please fill in the comment')
      }
    }
  }

  // Volume
  useEffect(() => {
    if (post && videoRef.current) {
      videoRef.current.muted = isMuted
    }
  }, [isMuted, post])

  // Like
  useEffect(() => {
    if (isUserLiked.length > 0) {
      setAlreadyLiked(true)
    } else {
      setAlreadyLiked(false)
    }
  }, [isUserLiked])

  return (
    <>
      <Head>
        <title>Detail</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      {post && (
        <div className="flex w-full h-full absolute left-0 top-0 bg-white flex-wrap lg:flex-nowrap">
          {/* Video */}
          <div className="relative w-full lg:w-7/12 flex-2 flex justify-center items-center bg-black mx-auto">
            {/* Close icon */}
            <div className="absolute top-6 left-6 z-50">
              <p className="text-2xl text-white cursor-pointer" onClick={() => router.back()}>
                <MdOutlineCancel />
              </p>
            </div>

            {/* Video */}
            <div className="relative">
              <div className="lg:h-[100vh]">
                <video
                  src={post.video.asset.url}
                  className="h-full cursor-pointer"
                  ref={videoRef}
                  onClick={onPlayPause}
                ></video>
                {/* Like and comment on small screen */}
                <div className="absolute right-6 top-[50%] -translate-y-1/2 block lg:hidden">
                  {!alreadyLiked ? (
                    <div className="text-4xl text-black" onClick={() => handleLike(true)}>
                      <MdFavorite />
                    </div>
                  ) : (
                    <div className="text-4xl text-red-500" onClick={() => handleLike(false)}>
                      <MdFavorite />
                    </div>
                  )}
                  <p className="font-semibold text-lg mb-4 text-center text-white">
                    {post.likes.length || 0}
                  </p>
                  <div
                    className="flex flex-col items-center text-white text-4xl cursor-pointer"
                    onClick={() => setModal(true)}
                  >
                    <FaCommentDots />
                  </div>
                  <p className="font-semibold text-lg mb-4 text-center text-white">
                    {post.comments?.length || 0}
                  </p>
                </div>
              </div>
            </div>

            {/* Play pause */}
            <div className="absolute left-[50%] top-[50%] -translate-x-1/2 -translate-y-1/2 cursor-pointer">
              {!playing && (
                <div>
                  <button onClick={onPlayPause}>
                    <BsFillPlayFill className="text-4xl lg:text-6xl text-white" />
                  </button>
                </div>
              )}
            </div>

            {/* Volume */}
            <div className="absolute right-5 bottom-20 text-white lg:bottom-10 lg:right-10">
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

          {/* Comments and likes section */}
          <div
            className={`absolute w-full bg-white h-screen overflow-scroll translate-y-full z-50 ease-in-out duration-300 lg:h-full lg:w-5/12 lg:translate-y-0 lg:relative ${
              modal && showModal
            }`}
          >
            <div
              className="absolute left-2 top-2 text-black text-2xl cursor-pointer block lg:hidden"
              onClick={() => setModal(false)}
            >
              <MdOutlineCancel />
            </div>
            <div className="ml-10">
              <div className="mt-4 lg:mt-20">
                <div className="flex gap-3 rounded-lg p-3 cursor-pointer">
                  <a href={`/profile/${post.postedBy._id}/like`}>
                      <img
                        src={post.postedBy.image}
                        alt=""
                        className="rounded-full w-10 h-10 md:w-14 md:h-14 object-cover"
                      />
                  </a>
                  {/* User name and caption */}
                  <a href={`/profile/${post.postedBy._id}/like`}>
                    <div>
                      <div className="flex gap-2 items-center">
                        <p className="text-lg md:text-2xl font-bold">
                          {post.postedBy.userName.toLocaleLowerCase().split(' ').join('')}
                        </p>
                        <GoVerified className="text-md text-blue-500" />
                      </div>
                      <p className="text-sm text-gray-500 break-normal">{post.postedBy.userName}</p>
                    </div>
                  </a>
                </div>
              </div>

              <h2 className="text-700 text-lg pl-3 pb-3">{post.caption}</h2>

              {/* Like button */}
              <div className="pl-3">
                {userProfile && (
                  <LikeButton
                    likes={post.likes}
                    handleLike={() => handleLike(true)}
                    handleDislike={() => handleLike(false)}
                  />
                )}
              </div>

              {/* Comment */}
              <Comments
                comments={post.comments}
                comment={comment}
                isPosting={isPosting}
                setComment={setComment}
                addComment={addComment}
              />
            </div>
          </div>
        </div>
      )}
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
