import '../styles/globals.css'
import type { AppProps } from 'next/app'
import { useEffect, useState } from 'react'
import Sidebar from '../components/Sidebar'
import Navbar from '../components/Navbar'

function MyApp({ Component, pageProps }: AppProps) {
  // Check if server side rendering
  const [isSsr, setIsSsr] = useState(true)

  useEffect(() => {
    setIsSsr(false)
  }, [])

  if (isSsr) return null

  return (
    <div>
      <Navbar />
      <div className="flex gap-6 md:gap-20">
        <div className="h-[92vh] overflow-hidden ">
          <Sidebar />
        </div>
        <div className="h-[88vh] flex-1 mt-4 flex flex-col overflow-auto videos">
          <Component {...pageProps} />
        </div>
      </div>
    </div>
  )
}

export default MyApp
