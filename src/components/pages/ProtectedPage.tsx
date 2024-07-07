import { MantineSize } from '@mantine/core'
import Page from './Page'
import { api } from '@/client/trpc'
import { useEffect } from 'react'
import { useRouter } from 'next/router'

type Props = {
  children: React.ReactNode
  title: string
  container: number | MantineSize
}

export default function ProtectedPage({ children, title, container }: Props) {
  const router = useRouter()
  const { data, isLoading } = api.auth.getUser.useQuery()

  useEffect(() => {
    if (!data) {
      router.replace('/')
    }
  }, [data, router])

  return (
    <Page title={title} container={container}>
      {!data && !isLoading ? children : null}
    </Page>
  )
}
