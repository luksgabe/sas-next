import { useRouter, useSearchParams } from 'next/navigation'
import { trpc } from '../_trpc/client'
import { useCallback, useState } from 'react'

const Page = () => {
  const router = useRouter()
  // const [requestSuccess, setRequestSuccess] = useState<boolean>(false)

  const searchParams = useSearchParams()
  const origin = searchParams.get('origin')

  useCallback(async () => {
    const { data, isLoading } = await trpc.authCallback.useQuery()

    if (data?.success) {
      router.push(origin ? `/${origin}` : '/dashboard')
    }
  }, [])
}

export default Page
