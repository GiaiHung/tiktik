import React, { useState } from 'react'
import axios from 'axios'
import Head from 'next/head'
import { UserI, Video } from '../../types'

import NoResults from '../../components/NoResults'
import { useRouter } from 'next/router'
import VideoCard from '../../components/VideoCard'
import useAuthStore from '../../store/authState'
import VideoHeader from '../../components/VideoHeader'

interface Props {
  videos: Video[]
}

function Search({ videos }: Props) {
  const [categories, setCategories] = useState('accounts')

  const { query } = useRouter()
  const { searchTerm }: any = query
  const { allUsers } = useAuthStore()

  const filteredAccounts = allUsers.filter((user: UserI) =>
    user.userName.toLowerCase().includes(searchTerm.toLowerCase())
  )

  const isVideos =
    categories === 'videos' ? 'border-b-2 border-black text-black' : 'text-gray-400 border-gray-200'
  const isAccounts =
    categories === 'accounts'
      ? 'border-b-2 border-black text-black'
      : 'text-gray-400 border-gray-200'

  return (
    <>
      <Head>
        <title>Tiktik - Make your day!</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <div className="w-full">
        <div className="flex gap-4 mt-6 mb-10 ml-2 border-b-2 border-gray-200">
          <button
            className={`cursor-pointer text-lg font-bold ${isAccounts}`}
            onClick={() => setCategories('accounts')}
          >
            Accounts
          </button>
          <button
            className={`cursor-pointer text-lg font-bold ${isVideos}`}
            onClick={() => setCategories('videos')}
          >
            Videos
          </button>
        </div>

        {categories === 'accounts' ? (
          <div>
            {filteredAccounts.length > 0 ? (
              filteredAccounts.map((account: UserI, index: number) => (
                <VideoHeader postedBy={account} key={index} />
              ))
            ) : (
              <NoResults text={`No accounts for ${searchTerm}`} />
            )}
          </div>
        ) : (
          <div>
            {videos.length > 0 ? (
              videos.map((video: Video, index) => <VideoCard key={index} header post={video} />)
            ) : (
              <NoResults text={`No current videos for ${searchTerm}`} />
            )}
          </div>
        )}
      </div>
    </>
  )
}

export async function getServerSideProps({
  params: { searchTerm },
}: {
  params: { searchTerm: string }
}) {
  const res = await axios.get(`${process.env.NEXT_PUBLIC_BASE_URL}/api/search/${searchTerm}`)

  return {
    props: {
      videos: res.data,
    },
  }
}

export default Search
