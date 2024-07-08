import { Container, MantineSize } from '@mantine/core'

import Head from 'next/head'
import Loader from '@/components/layout/Loader'
import { Suspense } from 'react'

type Props = {
  children: React.ReactNode
  title: string
  container: number | MantineSize
}

export default function Page({ children, title, container }: Props) {
  return (
    <Container size={container}>
      <Head>
        <title>{title}</title>
      </Head>
      <Suspense fallback={<Loader />}>{children}</Suspense>
    </Container>
  )
}
