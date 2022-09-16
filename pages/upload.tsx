import React, { useRef, useState } from 'react'
import Head from 'next/head'
import { FaCloudUploadAlt, FaSpinner } from 'react-icons/fa'
import { topics } from '../utils/constants'
import { SanityAssetDocument } from '@sanity/client'
import { client } from '../utils/client'
import useAuthStore from '../store/authState'
import axios from 'axios'
import { useRouter } from 'next/router'

function Upload() {
  const [videoAsset, setVideoAsset] = useState<SanityAssetDocument | null>(null)
  const [loading, setLoading] = useState<boolean>(false)
  const [caption, setCaption] = useState<string>(topics[0].name)
  const [option, setOption] = useState<string>()
  const [wrongFiles, setWrongFiles] = useState<boolean>(false)

  const selectFileRef = useRef<any>(null)
  const { userProfile }: any = useAuthStore()

  const router = useRouter()

  const uploadVideo = async (e: any) => {
    const selectedFiles = e.target.files[0]
    const types = ['video/mp4', 'video/webm', 'video/ogg']

    if (types.includes(selectedFiles.type)) {
      setWrongFiles(false)
      setLoading(true)

      client.assets
        .upload('file', selectedFiles, {
          contentType: selectedFiles.type,
          filename: selectedFiles.name,
        })
        .then((data) => {
          setVideoAsset(data)
          setLoading(false)
        })
        .catch((error) => alert(error))
    } else {
      setVideoAsset(null)
      setWrongFiles(true)
    }
  }

  const handlePost = async () => {
    if (videoAsset && caption && option) {
      const document = {
        _type: 'post',
        caption,
        video: {
          _type: 'file',
          asset: {
            _type: 'reference',
            _ref: videoAsset._id,
          },
        },
        userId: userProfile?._id,
        postedBy: {
          _type: 'postedBy',
          _ref: userProfile?._id,
        },
        topic: option,
      }

      await axios.post(`${process.env.NEXT_PUBLIC_BASE_URL}/api/post`, document)
      router.push('/')
    } else {
      alert('Please fill in all the inputs')
    }
  }

  const handleDiscard = () => {
    setCaption('')
    setVideoAsset(null)
    setOption(topics[0].name)
  }

  return (
    <>
      <Head>
        <title>Upload</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <div className="flex w-full h-full bg-[#F8F8F8] justify-center absolute left-0 top-[60px] overflow-scroll">
        <div className="flex flex-wrap gap-6 justify-between items-center w-[55%] bg-white rounded-lg mt-4 p-4 max-h-[550px] min-w-[360px]">
          <div className="mx-auto lg:mx-0">
            {/* Title */}
            <div>
              <p className="font-bold text-3xl">Upload Video</p>
              <p className="text-gray-400 text-md mt-2">Post a video to your account!</p>
            </div>

            {/* Upload video */}
            <div className="p-10 mt-10 w-[280px] h-[400px] border-dashed border-gray-200 border-4 rounded-2xl cursor-pointer flex flex-col justify-center items-center outline-none hover:bg-gray-200 hover:border-red-300">
              {loading ? (
                <h2 className="text-2xl text-center text-gray-500 font-semibold animate-spin">
                  <FaSpinner />
                </h2>
              ) : (
                <div>
                  {videoAsset ? (
                    <div>
                      <video
                        src={videoAsset.url}
                        controls
                        loop
                        className="bg-black rounded-lg h-[350px]"
                      ></video>
                    </div>
                  ) : (
                    <label className="cursor-pointer">
                      <div className="flex flex-col items-center justify-center h-full gap-4">
                        <div className="flex flex-col items-center justify-center">
                          <FaCloudUploadAlt className="text-7xl text-gray-500" />
                          <p className="font-bold uppercase">Upload video...</p>
                        </div>
                        <p className="text-gray-400 text-center font-medium">
                          MP4 or WebM or ogg <br />
                          720x1280 resolution or higher <br />
                          Less than 2 GB
                        </p>
                        <button
                          className="text-white bg-[#f51997] w-52 p-2 font-semibold cursor-pointer outline-none rounded-md hover:bg-[#ce0075]"
                          onClick={() => selectFileRef?.current?.click()}
                        >
                          Select File
                        </button>
                      </div>
                      <input
                        className="w-0 h-0"
                        type="file"
                        name="upload-video"
                        ref={selectFileRef}
                        onChange={uploadVideo}
                      />
                    </label>
                  )}
                </div>
              )}
            </div>

            {/* Wrong types handle */}
            {wrongFiles && (
              <p className="text-center text-xl text-red-400 font-semibold w-[250px] break-normal">
                Please select the right type videos. <br />
                ex: mpx, webm, ogg,...
              </p>
            )}
          </div>

          {/* Caption */}
          <div className="pb-10 mx-auto lg:mx-0 lg:pb-0">
            <div className="flex flex-col gap-3 pb-10">
              <label className="text-lg font-medium">Caption</label>
              <input
                type="text"
                className="border-2 border-gray-200 outline-none p-2 rounded-lg"
                value={caption}
                onChange={(e) => setCaption(e.target.value)}
              />

              <label className="text-lg font-medium">Topics</label>
              <select
                className="border-2 border-gray-200 text-gray-700 text-md capitalize cursor-pointer p-2 rounded-lg outline-none"
                onChange={(e) => setOption(e.target.value)}
              >
                {topics.map((topic) => (
                  <option key={topic.name}>{topic.name}</option>
                ))}
              </select>

              <div className="flex gap-6 mt-5">
                <button
                  className="px-2 py-1 text-lg font-semibold w-28 rounded-lg cursor-pointer text-white bg-green-500 hover:bg-green-600"
                  onClick={handlePost}
                >
                  Post
                </button>
                <button
                  className="px-2 py-1 text-lg text-white font-semibold w-28 rounded-lg cursor-pointer bg-red-500 hover:bg-red-600"
                  onClick={handleDiscard}
                >
                  Discard
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default Upload
