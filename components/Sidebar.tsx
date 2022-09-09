import React, { useState, useEffect } from 'react'
import { NextPage } from 'next'
import { useRouter } from 'next/router'
import Link from 'next/link'
import { AiFillHome, AiOutlineMenu } from 'react-icons/ai'
import { ImCancelCircle } from 'react-icons/im'

import { GoogleLogin } from '@react-oauth/google'
import Discover from './Discover'
import SuggestedAccounts from './SuggestedAccounts'
import Footer from './Footer'

function Sidebar() {
  const [sidebarActive, setSidebarActive] = useState<boolean>(true)

  useEffect(() => {
    const handleResize = () => {
      if(window.innerWidth > 768) {
        setSidebarActive(true)
      }
    }

    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [])

  return (
    <div>
      <div
        className="flex justify-center lg:hidden m-4 cursor-pointer text-xl"
        onClick={() => setSidebarActive((prev) => !prev)}
      >
        {sidebarActive ? <ImCancelCircle className='text-red-500' /> : <AiOutlineMenu className='text-gray-500' />}
      </div>
      <div>
        {sidebarActive && (
          <div className="w-20 border-r border-gray-200 flex flex-col justify-start mb-14 lg:w-350">
            <div>
              <Link href="/">
                <div className="normalLink">
                  <AiFillHome className="text-2xl" />
                  <span className="text-xl font-bold hidden lg:inline-flex">For you</span>
                </div>
              </Link>
            </div>

            <Discover />
            <SuggestedAccounts />
            <Footer />
          </div>
        )}
      </div>
    </div>
  )
}

export default Sidebar
