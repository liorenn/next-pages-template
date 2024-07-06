import { api } from '@/client/trpc'
import { useEffect } from 'react'
import { useRouter } from 'next/router'

export default function ProtectedPage({ children }: { children: React.ReactNode }) {
  const router = useRouter()
  const { data } = api.auth.getUser.useQuery()

  useEffect(() => {
    if (!data) {
      router.replace('/SignIn')
    }
  }, [data, router])

  return <>{!data ? children : null}</>
}
