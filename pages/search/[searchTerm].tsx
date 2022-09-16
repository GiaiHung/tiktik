import axios from 'axios'
import Head from 'next/head'
import { useRouter } from 'next/router'
import React, { useState } from 'react'
import NoResults from '../../components/NoResults'
import VideoCard from '../../components/VideoCard'
import VideoHeader from '../../components/VideoHeader'
import useAuthStore from '../../store/authState'
import { UserI, Video } from '../../types'

interface Props {
  videos: Video[]
}

function Search({ videos }: Props) {
  const [categories, setCategories] = useState<string>('accounts')

  const removeAscent = (str: string) => {
    if (str === null || str === undefined) return str
    str = str.toLowerCase()
    str = str.replace(/à|á|ạ|ả|ã|â|ầ|ấ|ậ|ẩ|ẫ|ă|ằ|ắ|ặ|ẳ|ẵ/g, 'a')
    str = str.replace(/è|é|ẹ|ẻ|ẽ|ê|ề|ế|ệ|ể|ễ/g, 'e')
    str = str.replace(/ì|í|ị|ỉ|ĩ/g, 'i')
    str = str.replace(/ò|ó|ọ|ỏ|õ|ô|ồ|ố|ộ|ổ|ỗ|ơ|ờ|ớ|ợ|ở|ỡ/g, 'o')
    str = str.replace(/ù|ú|ụ|ủ|ũ|ư|ừ|ứ|ự|ử|ữ/g, 'u')
    str = str.replace(/ỳ|ý|ỵ|ỷ|ỹ/g, 'y')
    str = str.replace(/đ/g, 'd')
    return str
  }

  const { query } = useRouter()
  const { searchTerm }: any = query
  const filteredSearchTerm = removeAscent(searchTerm.toLowerCase())
  const { allUsers } = useAuthStore()
  const filteredUsers = allUsers.filter((user: UserI) => {
    const filteredUserName = removeAscent(user.userName.toLowerCase().split(' ').join('')).replace(
      /[^a-zA-Z0-9]/g,
      ''
    )
    return filteredUserName.includes(filteredSearchTerm)
  })

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
            {filteredUsers.length > 0 ? (
              filteredUsers.map((account: UserI, index: number) => (
                <VideoHeader postedBy={account} key={index} />
              ))
            ) : (
              <NoResults text={`No accounts for ${searchTerm}`} />
            )}
          </div>
        ) : (
          <div>
            {videos.map((video: Video, index: number) => (
              <VideoCard post={video} key={index} />
            ))}
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
  const { data } = await axios.get(`${process.env.NEXT_PUBLIC_BASE_URL}/api/search/${searchTerm}`)

  return {
    props: {
      videos: data,
    },
  }
}

export default Search
