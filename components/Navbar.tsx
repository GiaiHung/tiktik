/* eslint-disable @next/next/no-img-element */
import React, { useEffect, useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { GoogleLogin, googleLogout } from '@react-oauth/google'
import { useRouter } from 'next/router'
import { AiOutlineLogout } from 'react-icons/ai'
import { BiSearch } from 'react-icons/bi'
import { IoMdAdd } from 'react-icons/io'

import Logo from '../utils/tiktik-logo.png'
import { createOrGetUser } from '../utils'
import useAuthStore from '../store/authState'

function Navbar() {
  const { userProfile, addUser, removeUser }: any = useAuthStore()
  
  const router = useRouter()

  const [searchValue, setSearchValue] = useState<string>('')

  const handleSearch = (e: { preventDefault: () => void }) => {
    e.preventDefault()

    if (searchValue) {
      router.push(`/search/${searchValue}`)
    }

    setSearchValue('')
  }

  return (
    <div className="flex justify-between items-center px-6 w-full py-3 border-b-2 shadow-md border-gray-200 md:px-8 lg:px-10 lg:shadow-none">
      <Link href="/">
        <div className="w-[120px] md:[140px]">
          <Image src={Logo} alt="logo" layout="responsive" className="cursor-pointer" />
        </div>
      </Link>

      {/* Search */}
      <div className="relative hidden md:block">
        <form className="absolute md:static top-10 -left-20" onSubmit={handleSearch}>
          <input
            type="text"
            placeholder="Search accounts and videos"
            spellCheck={false}
            className="bg-gray-200 p-3 pl-6 pr-[80px] md:text-md border rounded-full border-gray-100 w-[300px] md:w-[350px] focus:border-gray-300 focus:outline-none"
            value={searchValue}
            onChange={(e) => setSearchValue(e.target.value)}
          />
          <button
            className={`absolute right-5 top-3 pl-2 border-l-2 border-gray-300 text-2xl ${
              searchValue.trim().length > 0 ? 'text-gray-500' : 'text-gray-300'
            }`}
            onClick={handleSearch}
          >
            <BiSearch />
          </button>
        </form>
      </div>

      <div>
        {userProfile ? (
          <div className="flex items-center gap-4">
            <Link href="/upload">
              <button className="flex items-center gap-2 border-2 font-semibold rounded-lg px-2 py-1 cursor-pointer hover:bg-gray-100">
                <IoMdAdd className="text-lg" /> <span className="hidden md:block">Upload</span>
              </button>
            </Link>
            {userProfile.image && (
              <Link href={`/profile/${userProfile._id}`}>
                <img
                  src={userProfile.image}
                  alt=""
                  className="rounded-full w-10 h-10 object-cover cursor-pointer"
                />
              </Link>
            )}
            <button
              onClick={() => {
                googleLogout()
                removeUser()
              }}
            >
              <AiOutlineLogout className="text-3xl text-red-500 cursor-pointer hover:text-red-700" />
            </button>
          </div>
        ) : (
          <div>
            <GoogleLogin
              onSuccess={(response) => createOrGetUser(response, addUser)}
              onError={() => console.log('Error')}
            />
          </div>
        )}
      </div>
    </div>
  )
}

export default Navbar
