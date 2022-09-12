import axios from 'axios'
import Head from 'next/head'
import Image from 'next/image'
import NoResults from '../components/NoResults'
import VideoCard from '../components/VideoCard'
import { Video } from '../types'

interface Props {
  videos: Video[]
}

const Home = ({ videos }: Props) => {
  return (
    <>
      <Head>
        <title>Tiktik - Make your day!</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <div className="flex flex-col gap-10 h-full overflow-scroll">
        {videos.length ? (
          videos.map((video: Video) => <VideoCard header social post={video} key={video._id} />)
        ) : (
          <NoResults text="No Videos" />
        )}
      </div>
    </>
  )
}

export const getServerSideProps = async ({ query: { topic } }: { query: { topic: string } }) => {
  let response

  if (topic) {
    response = await axios.get(`${process.env.NEXT_PUBLIC_BASE_URL}/api/discover/${topic}`)
  } else {
    response = await axios.get(`${process.env.NEXT_PUBLIC_BASE_URL}/api/post`)
  }

  return {
    props: {
      videos: response.data,
    },
  }
}

export default Home
