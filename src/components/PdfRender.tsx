'use client'

import { ChevronDown, ChevronUp, Loader2 } from 'lucide-react'
import { Document, Page, pdfjs } from 'react-pdf'

import 'react-pdf/dist/esm/Page/AnnotationLayer.css'
import 'react-pdf/dist/esm/Page/TextLayer.css'
import { useToast } from './ui/use-toast'
import { useResizeDetector } from 'react-resize-detector'
import { Button } from './ui/button'
import { Input } from './ui/input'
import { useState } from 'react'

pdfjs.GlobalWorkerOptions.workerSrc = `//unpkg.com/pdfjs-dist@${pdfjs.version}/build/pdf.worker.min.mjs`

interface PdfRendererProps {
  url: string
}

const PdfRender = ({ url }: PdfRendererProps) => {
  const { toast } = useToast()
  const [numPages, setNumPages] = useState<number>()
  const [currPage, setCurrPage] = useState<number>(1)

  const { width, ref } = useResizeDetector()

  return (
    <div className='flex w-full flex-col items-center rounded-md bg-white shadow'>
      <div className='flex h-14 w-full items-center justify-between border-b border-zinc-200 px-2'>
        <div className='flex items-center gap-1.5'>
          <Button
            disabled={currPage <= 1}
            onClick={() => {
              setCurrPage(prev => (prev - 1 > 1 ? prev - 1 : 1))
            }}
            variant='ghost'
            aria-label='previous page'
          >
            <ChevronDown className='h-4 w-4' />
          </Button>

          <div className='flex items-center gap-1.5'>
            <Input className='h-8 w-12' />
            <p className='space-x-1 text-sm text-zinc-700'>
              <span>/</span>
              <span>{numPages ?? 'x'}</span>
            </p>
          </div>

          <Button
            onClick={() => {
              setCurrPage(prev => (prev + 1 > numPages! ? numPages! : prev + 1))
            }}
            variant='ghost'
            aria-label='next page'
          >
            <ChevronUp className='h-4 w-4' />
          </Button>
        </div>
      </div>

      <div className='max-h-screen w-full flex-1'>
        <div ref={ref}>
          <Document
            loading={
              <div className='flex justify-center'>
                <Loader2 className='my-24 h-6 w-6 animate-spin' />
              </div>
            }
            onLoadError={() => {
              toast({
                title: 'Error loading PDF',
                description: 'Please try again latter',
                variant: 'destructive'
              })
            }}
            onLoadSuccess={({ numPages }) => setNumPages(numPages)}
            file={url}
            className={'max-h-full'}
          >
            <Page width={width ? width : 1} pageNumber={currPage} />
          </Document>
        </div>
      </div>
    </div>
  )
}

export default PdfRender
