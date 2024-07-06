import { Burger, Button, Group, rem } from '@mantine/core'
import { CSSProperties, useEffect } from 'react'

import NavMenu from './NavMenu'
import { api } from '@/utils/client'
import { createNotification } from '@/utils/utils'
import { useAuthStore } from '@/utils/authStore'
import { useDisclosure } from '@mantine/hooks'
import { useRouter } from 'next/router'
import { useState } from 'react'

export default function Navbar() {
  const [loading, setLoading] = useState(false)
  const [opened, { toggle }] = useDisclosure(false)
  const { isAuthed, setIsAuthed } = useAuthStore()
  const { mutate: signOutMutation } = api.auth.signOut.useMutation()
  const { data, isLoading } = api.auth.getUser.useQuery()
  const router = useRouter()

  function signOut() {
    setLoading(true)
    signOutMutation(undefined, {
      onSuccess(data) {
        setIsAuthed(false)
        setLoading(false)
        createNotification(data)
        router.push('/')
      },
    })
  }

  useEffect(() => {
    if (data) {
      setIsAuthed(true)
    }
  }, [data])

  return (
    <header style={headerStyle}>
      <div style={innerStyle}>
        <Group gap='xs'>
          <Burger opened={opened} onClick={toggle} size='sm' hiddenFrom='sm' />
          <NavMenu drawerOpened={opened} closeDrawer={toggle} signOut={signOut} />
          <Button variant='subtle' radius='lg' color='dark.1' onClick={() => router.push('/')}>
            Home
          </Button>
        </Group>
        <Group>
          {!isLoading &&
            (isAuthed ? (
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
            ))}
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
