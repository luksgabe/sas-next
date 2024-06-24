'use client'

import { useRouter, useSearchParams } from 'next/navigation'
import { trpc } from '../_trpc/client'
import { useCallback, useState } from 'react'
import { Loader2 } from 'lucide-react'

const Page = () => {
  const router = useRouter()
  // const [requestSuccess, setRequestSuccess] = useState<boolean>(false)

  const searchParams = useSearchParams()
  const origin = searchParams.get('origin')

  useCallback(async () => {
    await onLoad()
  }, [])

  const onLoad = async () => {
    try {
      const { data, isLoading } = await trpc.authCallback.useQuery()

      if (data?.success) {
        router.push(origin ? `/${origin}` : '/dashboard')
      } else {
        router.push('/sign-in')
      }
    } catch (err: any) {
      if (err.code === 'UNAUTHORIZED') {
        router.push('/sign-in')
      } else {
        console.log(err)
      }
    }
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
