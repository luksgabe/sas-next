'use client'

import { useState } from 'react'
import { Dialog, DialogContent, DialogTrigger } from './ui/dialog'
import { Button } from './ui/button'
import { DialogTitle } from '@radix-ui/react-dialog'

import Dropzone from 'react-dropzone'
import { Cloud, File } from 'lucide-react'
import { Progress } from './ui/progress'

const UploadDropzone = () => {
  const [isUploading, setIsUploading] = useState<boolean>(true)
  const [uploadProgress, setUploadProgress] = useState<number>(0)

  const startSimulatedProgress = () => {
    setUploadProgress(0)

    const interval = setInterval(() => {
      setUploadProgress(prevProgress => {
        if (prevProgress >= 95) {
          clearInterval(interval)
          return prevProgress
        }
        return prevProgress + 5
      })
    }, 500)

    return interval
  }

  return (
    <Dropzone
      multiple={false}
      onDrop={async acceptedFile => {
        setIsUploading(true)

        const progressInterval = startSimulatedProgress()

        await new Promise(resolve => setTimeout(resolve, 10000))

        clearInterval(progressInterval)
        setUploadProgress(100)
      }}
    >
      {({ getRootProps, getInputProps, acceptedFiles }) => (
        <div
          {...getRootProps()}
          className='m-4 h-64 rounded-lg border border-dashed border-gray-300'
        >
          <div className='flex h-full w-full items-center justify-center'>
            <label
              htmlFor='dropzone-file'
              className='flex h-full w-full cursor-pointer flex-col items-center justify-center rounded-lg bg-gray-50 hover:bg-gray-100'
            >
              <div className='flex flex-col items-center justify-center pb-6 pt-5'>
                <Cloud className='mb-2 h-6 w-6 text-zinc-500' />
                <p className='mb-2 text-center text-sm text-zinc-700'>
                  <span className='font-semibold'>Click to upload</span>
                  or drag and drop
                </p>
                <p className='text-xs text-zinc-500'>PDF (up to 4mb)</p>
              </div>

              {acceptedFiles && acceptedFiles[0] ? (
                <div className='mx-w-xs flex items-center divide-x divide-zinc-200 overflow-hidden rounded-md bg-white outline outline-[1px] outline-zinc-200'>
                  <div className='grid h-full place-items-center px-3 py-2'>
                    <File className='h4 w-4 text-blue-500' />
                  </div>
                  <div className='h-full truncate px-3 py-2 text-sm'>
                    {acceptedFiles[0].name}
                  </div>
                </div>
              ) : null}

              {isUploading ? (
                <div className='mx-auto mt-4 w-full max-w-xs'>
                  <Progress
                    value={uploadProgress}
                    className='h-1 w-full bg-zinc-200'
                  />
                </div>
              ) : null}
            </label>
          </div>
        </div>
      )}
    </Dropzone>
  )
}

const UploadButton = () => {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <Dialog
      open={isOpen}
      onOpenChange={v => {
        if (!v) {
          setIsOpen(v)
        }
      }}
    >
      <DialogTrigger onClick={() => setIsOpen(true)} asChild>
        <Button>Upload PDV</Button>
      </DialogTrigger>

      <DialogContent>
        <DialogTitle>Title content</DialogTitle>
        <UploadDropzone />
      </DialogContent>
    </Dialog>
  )
}

export default UploadButton
