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
      
      <h1 className='text-red-500'>My app</h1>
    </>
  )
}

export default Home
