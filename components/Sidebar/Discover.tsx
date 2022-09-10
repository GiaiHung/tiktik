import React from 'react'
import Link from 'next/link'
import { useRouter } from 'next/router'

import { topics } from '../../utils/constants'

function Discover() {
  const { topic: query } = useRouter().query

  const topicStyle =
    'flex items-center gap-3 lg:border border-gray-300 text-black rounded-full px-3 py-2 cursor-pointer hover:bg-primary'
  const activeTopicStyle =
    'flex items-center gap-3 lg:border border-[#F51997] text-[#F51997] rounded-full px-3 py-2 cursor-pointer hover:bg-primary'

  return (
    <div className="pb-4 px-0 lg:px-2">
      <p className="hidden text-gray-500 font-semibold m-3 lg:block">Popular topics</p>
      <div className="flex flex-wrap gap-3 justify-center lg:justify-start">
        {topics.map((topic) => (
          <Link href={`/?topic=${topic.name}`} key={topic.name}>
            <div className={query === topic.name ? activeTopicStyle : topicStyle }>
              <span className="text-2xl">{topic.icon}</span>
              <span className="text-md font-medium capitalize hidden lg:inline-flex">
                {topic.name}
              </span>
            </div>
          </Link>
        ))}
      </div>
    </div>
  )
}

export default Discover
