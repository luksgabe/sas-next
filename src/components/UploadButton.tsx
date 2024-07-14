'use client'

import { useState } from 'react'
import { Dialog, DialogContent, DialogTrigger } from './ui/dialog'
import { Button } from './ui/button'
import { DialogTitle } from '@radix-ui/react-dialog'

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
        Example content
      </DialogContent>
    </Dialog>
  )
}

export default UploadButton
