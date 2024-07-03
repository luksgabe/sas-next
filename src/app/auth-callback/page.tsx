'use client'

import { useRouter, useSearchParams } from 'next/navigation'
import { trpc } from '../_trpc/client'
import { Loader2 } from 'lucide-react'
import { useCallback, useEffect, useState } from 'react'
import { useQuery } from '@tanstack/react-query'

const Page = () => {
  const router = useRouter()
  const searchParams = useSearchParams()
  const origin = searchParams.get('origin')
  const [loaded, setLoaded] = useState(false)

  const data = trpc.authCallback.useQuery()

  if (data.isSuccess) {
    router.push(origin ? `/${origin}` : '/dashboard')
  } else if (data.isError) {
    console.log(data.error)
    router.push('/auth/register')
  }

  return (
    <div className='justfy-center mt-24 flex w-full'>
      <div className='flex flex-col items-center gap-2'>
        <Loader2 className='h-8 w-8 animate-spin text-zinc-800' />
        <h3 className='text-xl font-semibold'>Setting up you account...</h3>
        <p>You will be redirected automatically.</p>
      </div>
    </div>
  )
}

export default Page
