'use client'

import { PropsWithChildren, useState } from 'react'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { httpBatchLink } from '@trpc/client'
import { trpc } from '@/server/client'

const Providers = ({ children }: PropsWithChildren) => {
  const url = 'http://localhost:3000/api/trpc'

  const [queryClient] = useState(() => new QueryClient({}))
  const [trpcClient] = useState(
    trpc.createClient({
      links: [
        httpBatchLink({
          url
        })
      ]
    })
  )

  return (
    <trpc.Provider client={trpcClient} queryClient={queryClient}>
      <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
    </trpc.Provider>
  )
}

export default Providers
