'use client'

import { useRouter, useSearchParams } from 'next/navigation'
import { Loader2 } from 'lucide-react'
import { useCallback, useEffect, useState } from 'react'
import { useQuery } from '@tanstack/react-query'
import { trpc } from '@/server/client'

const Page = () => {
  const router = useRouter()
  const searchParams = useSearchParams()
  const origin = searchParams.get('origin')
  const [loaded, setLoaded] = useState(false)

  const getUserAuth = trpc.user.authCallback.useMutation()

  const fetch = useCallback(async () => {
    debugger
    await getUserAuth.mutateAsync(undefined, {
      onSuccess: result => {
        if (result.success) {
          router.push(origin ? `/${origin}` : '/dashboard')
        }
      },
      onError: err => {
        debugger
        if (err.data?.code === 'UNAUTHORIZED') router.push('/auth/register')
        else router.back()
      }
    })
  }, [])

  useEffect(() => {
    fetch()
  }, [fetch])

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
