/* eslint-disable @next/next/no-img-element */
import Image from 'next/image'
import Link from 'next/link'
import React, { useEffect } from 'react'
import { GoVerified } from 'react-icons/go'
import useAuthStore from '../../store/authState'
import { UserI } from '../../types'

function SuggestedAccounts() {
  const { allUsers, fetchAllUsers } = useAuthStore()

  useEffect(() => {
    fetchAllUsers()
  }, [fetchAllUsers])

  return (
    <div className="ml-4 py-2 border-b border-gray-200">
      <p className="hidden text-lg font-semibold text-gray-500 lg:block">Suggested accounts</p>

      <div>
        {allUsers.slice(0, 6).map((user: UserI) => (
          <Link href={`/profile/${user._id}`} key={user._id}>
            <div className="flex items-center gap-3 mb-4 p-0 cursor-pointer hover:bg-white lg:p-2 lg:mb-2 lg:hover:bg-primary">
              <div className="w-10 h-10">
                <Image
                  width={34}
                  height={34}
                  className="rounded-full object-cover"
                  src={user.image}
                  alt="user-profile"
                  layout="responsive"
                />
              </div>

              <div className="hidden lg:block">
                <p className="flex items-center gap-3 lowercase font-semibold">
                  {user.userName.replaceAll(' ', '')}{' '}
                  <GoVerified className="text-md text-blue-500" />
                </p>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  )
}

export default SuggestedAccounts
