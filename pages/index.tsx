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
        <title>Tiktik</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <div className="flex flex-col gap-10 h-full overflow-scroll">
        {videos.length ? (
          videos.map((video: Video) => <VideoCard post={video} key={video._id} />)
        ) : (
          <NoResults text="No Videos" />
        )}
      </div>
    </>
  )
}

export const getServerSideProps = async () => {
  const { data } = await axios.get(`${process.env.NEXT_PUBLIC_BASE_URL}/api/post`)

  return {
    props: {
      videos: data,
    },
  }
}

export default Home
