import React, { useState, useEffect, useRef } from 'react'
import Head from 'next/head'
import axios from 'axios'
import { Video } from '../../types'

import { MdOutlineCancel } from 'react-icons/md'
import { BsFillPlayFill } from 'react-icons/bs'
import { HiVolumeUp, HiVolumeOff } from 'react-icons/hi'
import { useRouter } from 'next/router'

interface Props {
  postDetails: Video
}

function Detail({ postDetails }: Props) {
  const router = useRouter()
  const [post, setPost] = useState(postDetails)

  const videoRef = useRef(null)

  if (!post) return null

  return (
    <>
      <Head>
        <title>Detail</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <div className="flex w-full absolute left-0 top-0 bg-white flex-wrap lg:flex-nowrap">
        <div className="relative w-[1000px] lg:w-9/12 flex-2 flex justify-center items-center bg-black mx-auto">
          {/* Close icon */}
          <div className="absolute top-6 left-6 z-50" onClick={() => router.back()}>
            <p className="text-2xl text-white cursor-pointer">
              <MdOutlineCancel />
            </p>
          </div>

          {/* Video */}
          <div className="relative">
            <div className="lg:h-[100vh] h-[60vh]">
              <video src={postDetails.video.asset.url} className='h-full cursor-pointer'></video>
            </div>
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
