import '@mantine/core/styles.css'
import '@mantine/nprogress/styles.css'
import '@mantine/notifications/styles.css'

import { ColorSchemeScript, MantineProvider, createTheme } from '@mantine/core'

import type { AppProps } from 'next/app'
import Layout from '@/components/layout/Layout'
import { Notifications } from '@mantine/notifications'
import RouterTransition from '@/components/layout/RouterTransition'
import { api } from '@/client/trpc'

const theme = createTheme({
  breakpoints: {
    xs: '400px',
    sm: '600px',
    md: '800px',
    lg: '1000px',
    xl: '1200px',
  },
})

function App({ Component, pageProps }: AppProps) {
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
