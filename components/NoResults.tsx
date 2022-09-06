import React from 'react'

function NoResults({ text }: { text: string }) {
  return <h2 className='text-2xl font-semibold text-center m-4'>{text}</h2>
}

export default NoResults
