import '@mantine/core/styles.css'
import '@mantine/nprogress/styles.css'
import '@mantine/notifications/styles.css'

import { ColorSchemeScript, MantineProvider } from '@mantine/core'

import type { AppProps } from 'next/app'
import Layout from '@/components/layout/Layout'
import { Notifications } from '@mantine/notifications'
import RouterTransition from '@/components/layout/RouterTransition'
import { api } from '@/utils/client'

function App({ Component, pageProps }: AppProps) {
  return (
    <>
      <ColorSchemeScript defaultColorScheme='dark' />
      <MantineProvider defaultColorScheme='dark'>
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
