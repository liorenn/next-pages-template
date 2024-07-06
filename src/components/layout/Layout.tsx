import { Container } from '@mantine/core'
import Navbar from '@/components/layout/Navbar'
import type { ReactNode } from 'react'
import ScrollToTop from '@/components/layout/ScrollToTop'

type Props = { children: ReactNode }

export default function layout({ children }: Props) {
  return (
    <>
      <Navbar />
      <Container size={1400}>{children}</Container>
      <ScrollToTop />
    </>
  )
}
