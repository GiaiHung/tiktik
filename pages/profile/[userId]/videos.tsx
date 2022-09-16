import axios from 'axios'
import Head from 'next/head'
import React from 'react'
import Header from '../../../components/Profile/Header'
import Main from '../../../components/Profile/Main'
import { UserI, Video } from '../../../types'

interface Props {
  videos: {
    user: UserI
    userVideos: Video[]
  }
}

function UserLikedPage({ videos }: Props) {
  return (
    <>
      <Head>
        <title>Tiktik - Make your day!</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <div className="w-full h-screen overflow-scroll">
        <Header user={videos.user} />
        <Main videosList={videos.userVideos} videos />
      </div>
    </>
  )
}

export async function getServerSideProps({ params: { userId } }: { params: { userId: string } }) {
  const response = await axios.get(
    `${process.env.NEXT_PUBLIC_BASE_URL}/api/profile/${userId}/videos`
  )

  return {
    props: {
      videos: response.data,
    },
  }
}

export default UserLikedPage
