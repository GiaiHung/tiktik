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
  const { userProfile, addUser, removeUser } = useAuthStore()

  return (
    <div className="flex justify-between items-center px-6 w-full py-3 border-b-2 shadow-md border-gray-200 md:px-8 lg:px-10 lg:shadow-none">
      <Link href="/">
        <div className="w-[120px] md:[140px]">
          <Image src={Logo} alt="logo" layout="responsive" className="cursor-pointer" />
        </div>
      </Link>

      {/* Search */}
      <div>search</div>

      <div>
        {userProfile ? (
          <div className="flex items-center gap-4">
            <Link href="/upload">
              <button className="flex items-center gap-2 border-2 font-semibold rounded-lg px-2 py-1 cursor-pointer hover:bg-gray-100">
                <IoMdAdd className="text-lg" /> <span className="hidden md:block">Upload</span>
              </button>
            </Link>
            {userProfile.image && (
              <Link href="">
                <>
                  <img
                    src={userProfile.image}
                    alt=""
                    className="rounded-full w-10 h-10 object-cover cursor-pointer"
                  />
                </>
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
