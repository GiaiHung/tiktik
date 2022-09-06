import axios from 'axios'
import type { NextPage } from 'next'
import Head from 'next/head'
import Image from 'next/image'

const Home: NextPage = () => {
  return (
    <>
      <Head>
        <title>Tiktik</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <h1 className="text-red-500">My app</h1>
    </>
  )
}

export const getServerSideProps = async () => {
  const response = await axios.get('http://localhost:3000/api/post')
  console.log(response.data.name)

  return {
    props: {},
  }
}

export default Home
