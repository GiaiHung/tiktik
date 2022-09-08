import { SanityAssetDocument } from '@sanity/client'
import Head from 'next/head'
import React, { useState, useRef } from 'react'
import { FaCloudUploadAlt } from 'react-icons/fa'
import { MdDelete } from 'react-icons/md'

import { client } from '../utils/client'

function Upload() {
  const [loading, setLoading] = useState(false)
  const [videoAsset, setVideoAsset] = useState<SanityAssetDocument | null>(null)
  const [wrongTypeFile, setWrongTypeFile] = useState(false)
  const filePickerRef = useRef<any>(null)

  const uploadVideo = async (e: any) => {
    const selectedFiles = e.target.files[0]
    console.log(selectedFiles)

    const types = ['video/mp4', 'video/webm', 'video/ogg']

    if (types.includes(selectedFiles.type)) {
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
      setLoading(false)
      setWrongTypeFile(true)
    }
  }

  return (
    <>
      <Head>
        <title>Upload</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <div className="flex w-full h-full bg-[#F8F8F8] justify-center absolute left-0 top-[60px]">
        <div className="flex flex-wrap gap-6 justify-center items-center bg-white rounded-lg mt-4 p-4 max-h-[550px]">
          <div>
            <div>
              <p className="font-bold text-3xl">Upload Video</p>
              <p className="text-gray-400 text-md mt-2">Post a video to your account!</p>
            </div>
            <div className="p-10 mt-10 w-[280px] h-[400px] border-dashed border-gray-200 border-4 rounded-2xl cursor-pointer flex flex-col justify-center items-center outline-none hover:bg-gray-200 hover:border-red-300">
              {loading ? (
                <h2>Loading...</h2>
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
                          onClick={() => filePickerRef?.current?.click()}
                        >
                          Select File
                        </button>
                      </div>
                      <input
                        ref={filePickerRef}
                        className="w-0 h-0"
                        type="file"
                        name="upload-video"
                        onChange={uploadVideo}
                      />
                    </label>
                  )}
                </div>
              )}
            </div>
            {wrongTypeFile && (
              <p className="text-center text-xl text-red-400 font-semibold w-[250px] break-normal">
                Please select the right type videos. <br />
                ex: mpx, webm, ogg,...
              </p>
            )}
          </div>

          {/* Caption */}
          <div>Caption</div>
        </div>
      </div>
    </>
  )
}

export default Upload