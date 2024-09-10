'use client'

import { Document, Page, pdfjs } from 'react-pdf'

import 'react-pdf/dist/esm/Page/AnnotationLayer.css'
import 'react-pdf/dist/esm/Page/TextLayer.css'

//pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.min.js`

pdfjs.GlobalWorkerOptions.workerSrc = `//unpkg.com/pdfjs-dist@${pdfjs.version}/build/pdf.worker.min.mjs`

// pdfjs.GlobalWorkerOptions.workerSrc = new URL(
//   'pdfjs-dist/build/pdf.worker.min.mjs',
//   import.meta.url
// ).toString()

interface PdfRendererProps {
  url: string
}

const PdfRender = ({ url }: PdfRendererProps) => {
  return (
    <div className='flex w-full flex-col items-center rounded-md bg-white shadow'>
      <div className='flex h-14 w-full items-center justify-between border-b border-zinc-200 px-2'>
        <div className='flex items-center gap-1.5'>topbar</div>
      </div>

      <div className='max-h-screen w-full flex-1'>
        <div>
          <Document file={url} className={'max-h-full'}>
            <Page pageNumber={1} />
          </Document>
        </div>
      </div>
    </div>
  )
}

export default PdfRender
