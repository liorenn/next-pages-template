import { Burger, Button, Group, rem } from '@mantine/core'

import { CSSProperties } from 'react'
import NavMenu from './NavMenu'
import { api } from '@/client/trpc'
import { createNotification } from '@/client/utils'
import { useDisclosure } from '@mantine/hooks'
import { useRouter } from 'next/router'
import { useState } from 'react'

export default function Header() {
  const [loading, setLoading] = useState(false)
  const [opened, { toggle }] = useDisclosure(false)
  const { mutate: signOutMutation } = api.auth.signOut.useMutation()
  const { data, isLoading } = api.auth.getUser.useQuery()
  const router = useRouter()

  function signOut() {
    setLoading(true)
    signOutMutation(undefined, {
      onSuccess(data) {
        setLoading(false)
        createNotification(data)
        router.push('/')
      },
    })
  }

  return (
    <header style={headerStyle}>
      <div style={innerStyle}>
        <Group>
          <Burger opened={opened} onClick={toggle} size='sm' hiddenFrom='sm' />
          <NavMenu drawerOpened={opened} closeDrawer={toggle} signOut={signOut} />
          <Button variant='subtle' radius='lg' color='dark.1' onClick={() => router.push('/')}>
            Home
          </Button>
          <Group visibleFrom='sm'>
            <Button variant='subtle' radius='lg' color='dark.1' onClick={() => router.push('/')}>
              Page
            </Button>
            <Button variant='subtle' radius='lg' color='dark.1' onClick={() => router.push('/')}>
              Second Page
            </Button>
          </Group>
        </Group>

        <Group visibleFrom={'xs'}>
          {data ? (
            <Group>
              <Button
                loading={loading}
                onClick={() => {
                  signOut()
                }}
                variant='subtle'
                radius='lg'
                color='dark.1'>
                Sign Out
              </Button>
            </Group>
          ) : (
            <Group>
              <Button
                variant='subtle'
                radius='lg'
                color='dark.1'
                onClick={() => router.push('/signIn')}>
                Sign In
              </Button>
              <Button
                variant='subtle'
                radius='lg'
                color='dark.1'
                onClick={() => router.push('/signUp')}>
                Sign Up
              </Button>
            </Group>
          )}
        </Group>
      </div>
    </header>
  )
}

const headerStyle: CSSProperties = {
  height: rem(56),
  marginBottom: rem(20),
  backgroundColor: 'var(--mantine-color-body)',
  borderBottom: `${rem(
    1
  )} solid light-dark(var(--mantine-color-gray-3), var(--mantine-color-dark-4))`,
  paddingLeft: 'var(--mantine-spacing-md)',
  paddingRight: 'var(--mantine-spacing-md)',
}

const innerStyle: CSSProperties = {
  height: rem(56),
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
}
