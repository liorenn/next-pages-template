import { Container } from '@mantine/core'
import Header from '@/components/layout/Header'
import type { ReactNode } from 'react'
import ScrollToTop from '@/components/layout/ScrollToTop'

type Props = { children: ReactNode }

export default function Layout({ children }: Props) {
  return (
    <>
      <Header />
      <Container size={1400}>{children}</Container>
      <ScrollToTop />
    </>
  )
}
