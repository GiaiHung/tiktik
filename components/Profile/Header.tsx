/* eslint-disable @next/next/no-img-element */
import Image from 'next/image'
import React from 'react'
import { GoVerified } from 'react-icons/go'
import { UserI } from '../../types'

function Header({ user }: { user: UserI }) {
  return (
    <div className="flex gap-4 items-center justify-center lg:justify-start">
      <img
        src={user.image}
        alt=""
        className="rounded-full w-12 h-12 cursor-pointer object-cover lg:w-20 lg:h-20"
      />

      <div className="flex flex-col gap-1">
        <div className="flex items-center gap-2">
          <h2 className="text-lg font-bold tracking-wider lg:text-4xl">
            {user?.userName.split(' ').join('').toLocaleLowerCase()}
          </h2>
          <GoVerified className="text-md text-blue-400 lg:text-2xl" />
        </div>
        <p className="text-md text-gray-700 font-semibold lg:text-xl">{user?.userName}</p>
        <button className="bg-red-500 text-white text-lg py-1 mt-2 cursor-pointer rounded-lg hover:bg-red-600 min-w-[150px]">
          Follow
        </button>
      </div>
    </div>
  )
}

export default Header
