import axios from 'axios'
import Head from 'next/head'
import Image from 'next/image'
import React, { useState, useEffect } from 'react'
import { GoVerified } from 'react-icons/go'
import { UserI, Video } from '../../types'

import NoResults from '../../components/NoResults'
import VideoCard from '../../components/VideoCard'

interface Props {
  data: {
    user: UserI
    userVideos: Video[]
    userLikedVideos: Video[]
  }
}

function Profile({ data }: Props) {
  const [showUserVideos, setShowUserVideos] = useState<boolean>(false)
  const [videosList, setVideosList] = useState<Video[]>([])

  const { user, userLikedVideos, userVideos } = data

  const videos = showUserVideos
    ? 'border-b-2 border-black text-black'
    : 'text-gray-400 border-gray-200'
  const liked = !showUserVideos
    ? 'border-b-2 border-black text-black'
    : 'text-gray-400 border-gray-200'

  useEffect(() => {
    const fetchVideos = async () => {
      if (showUserVideos) {
        setVideosList(userVideos)
      } else {
        setVideosList(userLikedVideos)
      }
    }

    fetchVideos()
  }, [showUserVideos, userLikedVideos, userVideos])

  return (
    <>
      <Head>
        <title>Tiktik - Make your day!</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <div className="w-full h-screen overflow-scroll">
        <div className="flex gap-4 items-center">
          <Image
            src={user.image}
            alt=""
            width={100}
            height={100}
            layout="fixed"
            className="rounded-full cursor-pointer object-cover"
          />

          <div className="flex flex-col gap-2">
            <div className="flex items-center gap-2">
              <h2 className="text-4xl font-bold tracking-wider">
                {user.userName.split(' ').join('').toLocaleLowerCase()}
              </h2>
              <GoVerified className="text-2xl text-blue-400" />
            </div>
            <p className="text-lg text-gray-700 font-semibold">{user.userName}</p>
            <button className="bg-red-500 text-white text-lg py-1 cursor-pointer rounded-lg hover:bg-red-600">
              Follow
            </button>
          </div>
        </div>

        <div>
          <div className="flex gap-4 mt-6 mb-10 ml-2 border-b-2 border-gray-200">
            <button
              className={`cursor-pointer text-lg font-bold ${liked}`}
              onClick={() => setShowUserVideos(false)}
            >
              Liked
            </button>
            <button
              className={`cursor-pointer text-lg font-bold ${videos}`}
              onClick={() => setShowUserVideos(true)}
            >
              Videos
            </button>
          </div>

          <div className="flex flex-gap-6 flex-wrap justify-center md:justify-start">
            {videosList.length > 0 ? (
              videosList.map((post: Video, idx: number) => <VideoCard key={idx} post={post} />)
            ) : (
              <NoResults text={`No ${showUserVideos ? '' : 'Liked'} Videos Yet`} />
            )}
          </div>
        </div>
      </div>
    </>
  )
}

export async function getServerSideProps({ params: { userId } }: { params: { userId: string } }) {
  const res = await axios.get(`${process.env.NEXT_PUBLIC_BASE_URL}/api/profile/${userId}`)

  return {
    props: {
      data: res.data,
    },
  }
}

export default Profile
