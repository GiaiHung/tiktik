import '../styles/globals.css'
import type { AppProps } from 'next/app'
import { useEffect, useState } from 'react'
import Sidebar from '../components/Sidebar/Sidebar'
import Navbar from '../components/Navbar'

import { GoogleOAuthProvider } from '@react-oauth/google'

function MyApp({ Component, pageProps }: AppProps) {
  // Check if server side rendering
  const [isSsr, setIsSsr] = useState(true)

  useEffect(() => {
    setIsSsr(false)
  }, [])

  if (isSsr) return null

  return (
    <GoogleOAuthProvider clientId={`${process.env.NEXT_PUBLIC_GOOGLE_API}`}>
      <div className="lg:w-[1200px] mx-auto overflow-hidden h-screen">
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
    </GoogleOAuthProvider>
  )
}

export default MyApp
