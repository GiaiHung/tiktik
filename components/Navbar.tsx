import React, { useEffect, useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { AiOutlineLogout } from 'react-icons/ai'
import { BiSearch } from 'react-icons/bi'
import { IoMdAdd } from 'react-icons/io'
import { GoogleLogin, GoogleLogout } from 'react-google-login'

import Logo from '../utils/tiktik-logo.png'

function Navbar() {
  return (
    <div className="w-full px-8 py-3 border-b-2 shadow-md border-gray-200">
      <Link href='/'>
          <div className='w-[120px] md:[140px]'>
            <Image src={Logo} alt="logo" layout="responsive" className="cursor-pointer" />
          </div>
      </Link>
    </div>
  )
}

export default Navbar
