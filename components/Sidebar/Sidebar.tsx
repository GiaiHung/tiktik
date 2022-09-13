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
  const [sidebarActive, setSidebarActive] = useState<boolean>(false)

  const slide = '!translate-x-0 !opacity-1'

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth > 768) {
        setSidebarActive(true)
      }
    }

    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [])

  return (
    <>
      {!sidebarActive && <div
        className="absolute top-[80px] left-2 cursor-pointer"
        onClick={() => setSidebarActive(true)}
      >
        <AiOutlineMenu className="text-gray-500 text-2xl" />
      </div>}
      
      <div
        className={`h-screen overflow-scroll -translate-x-full ${sidebarActive && slide} ease-in-out duration-150`}
      >
        <div
          className="flex justify-center lg:hidden m-4 cursor-pointer text-xl"
          onClick={() => setSidebarActive(false)}
        >
          <ImCancelCircle className="text-red-500" />
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
    </>
  )
}

export default Sidebar
