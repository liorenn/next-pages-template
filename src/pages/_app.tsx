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
    autoContrast: true,
    primaryColor: primaryColor.color,
    colors: {
      white: [
        '#f5f5f5',
        '#e7e7e7',
        '#cdcdcd',
        '#b2b2b2',
        '#9a9a9a',
        '#8b8b8b',
        '#848484',
        '#717171',
        '#656565',
        '#575757',
      ],
      black: [
        '#C1C2C5',
        '#A6A7AB',
        '#909296',
        '#5C5F66',
        '#373A40',
        '#2C2E33',
        '#25262B',
        '#1A1B1E',
        '#141517',
        '#101113',
      ],
    },
    scale,
    fontFamily:
      '-apple-system, BlinkMacSystemFont, Segoe UI, Roboto, Helvetica, Arial, sans-serif, Apple Color Emoji, Segoe UI Emoji',
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
