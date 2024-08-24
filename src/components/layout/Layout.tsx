import { AppShell } from '@mantine/core'
import Header from '@/components/layout/Header'
import MobileNavigation from '@/components/layout/MobileNavigation'
import type { ReactNode } from 'react'
import ScrollToTop from '@/components/layout/ScrollToTop'
import { useViewportSize } from '@mantine/hooks'

type Props = { children: ReactNode }

export default function Layout({ children }: Props) {
  const { width } = useViewportSize()

  return (
    <>
      <AppShell header={{ height: 56 }} padding='md'>
        <AppShell.Header>
          <Header />
        </AppShell.Header>
        <AppShell.Main mb={width < 600 ? 60 : 0}>
          {children}
          <ScrollToTop />
        </AppShell.Main>
        <AppShell.Footer withBorder={false}>{width < 600 && <MobileNavigation />}</AppShell.Footer>
      </AppShell>
    </>
  )
}
