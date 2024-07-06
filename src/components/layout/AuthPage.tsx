import { api } from '@/client/trpc'
import { useEffect } from 'react'
import { useRouter } from 'next/router'

export default function AuthPage({ children }: { children: React.ReactNode }) {
  const router = useRouter()
  const { data, isLoading } = api.auth.getUser.useQuery()

  useEffect(() => {
    if (data) {
      router.replace('/')
    }
  }, [data, router])

  return <>{!data && !isLoading ? children : null}</>
}
