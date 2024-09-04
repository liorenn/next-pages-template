import { AppShell, useMantineColorScheme } from '@mantine/core'
import Header from '@/components/layout/Header'
import MobileNavigation from '@/components/layout/MobileNavigation'
import { useEffect, type ReactNode } from 'react'
import ScrollToTop from '@/components/layout/ScrollToTop'
import { useViewportSize } from '@mantine/hooks'
import { useThemeStore } from '@/hooks/useThemeStore'
import { useIsDarkMode } from '@/hooks/common'

type Props = { children: ReactNode }

export default function Layout({ children }: Props) {
  const dark = useIsDarkMode()
  const { width } = useViewportSize()
  const { setPrimaryColor, primaryColor } = useThemeStore()

  useEffect(() => {
    if (primaryColor.name === 'adaptive') {
      setPrimaryColor({
        name: 'adaptive',
        color: dark ? 'white' : 'black',
      })
    }
  }, [dark])

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
        <AppShell.Footer withBorder={false} hiddenFrom='sm'>
          <MobileNavigation />
        </AppShell.Footer>
      </AppShell>
    </>
  )
}
