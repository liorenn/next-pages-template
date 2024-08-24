import '@mantine/core/styles.css'
import '@mantine/nprogress/styles.css'
import '@mantine/notifications/styles.css'

import { ColorSchemeScript, MantineProvider, createTheme } from '@mantine/core'

import type { AppProps } from 'next/app'
import Layout from '@/components/layout/Layout'
import { Notifications } from '@mantine/notifications'
import RouterTransition from '@/components/layout/RouterTransition'
import { api } from '@/lib/trpc'
import { useThemeStore } from '@/hooks/useThemeStore'

function App({ Component, pageProps }: AppProps) {
  const { primaryColor, scale } = useThemeStore()

  const theme = createTheme({
    primaryColor,
    scale,
    fontFamily: 'Greycliff CF, sans-serif',
    breakpoints: {
      xs: '400px',
      sm: '600px',
      md: '800px',
      lg: '1000px',
      xl: '1200px',
    },
  })

  return (
    <>
      <ColorSchemeScript defaultColorScheme='dark' />
      <MantineProvider defaultColorScheme='dark' theme={theme}>
        <Notifications />
        <Layout>
          <RouterTransition />
          <Component {...pageProps} />
        </Layout>
      </MantineProvider>
    </>
  )
}

export default api.withTRPC(App)
