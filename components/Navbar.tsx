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
  const { userProfile, addUser } = useAuthStore()

  return (
    <div className="flex justify-between items-center px-6 w-full py-3 border-b-2 shadow-md border-gray-200 md:px-8 lg:px-10">
      <Link href="/">
        <div className="w-[120px] md:[140px]">
          <Image src={Logo} alt="logo" layout="responsive" className="cursor-pointer" />
        </div>
      </Link>

      {/* Search */}
      <div>search</div>

      <div>
        {userProfile ? (
          <div>Logged in</div>
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
