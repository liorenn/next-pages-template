import { ActionIcon, Button, Divider, Group, Popover, Stack } from '@mantine/core'
import {
  IconLogin2,
  IconLogout,
  IconLogout2,
  IconUserCircle,
  IconUserFilled,
  IconUserPlus,
} from '@tabler/icons-react'

import { api } from '@/lib/trpc'
import { createNotification } from '@/lib/utils'
import { useRouter } from 'next/router'
import { useState } from 'react'
import { useViewportSize } from '@mantine/hooks'

type Props = {}

export default function AuthPopover({}: Props) {
  const router = useRouter()
  const [opened, setOpened] = useState(false)
  const [loading, setLoading] = useState(false)
  const { width } = useViewportSize()
  const { data: user } = api.auth.getUser.useQuery()
  const { mutate: signOutMutation } = api.auth.signOut.useMutation()

  function signOut() {
    setOpened(false)
    setLoading(true)
    signOutMutation(undefined, {
      onSuccess(data) {
        createNotification(data)
        setLoading(false)
      },
    })
  }

  return (
    <Group>
      <Popover offset={10} shadow='md' width={200} opened={opened} onChange={setOpened}>
        <Popover.Target>
          <ActionIcon
            radius='md'
            size='lg'
            variant={width > 400 ? 'subtle' : 'light'}
            onClick={() => setOpened((open) => !open)}>
            <IconUserCircle stroke={2} size={20} />
          </ActionIcon>
        </Popover.Target>
        <Popover.Dropdown p='sm'>
          <Stack gap='xs'>
            {user ? (
              <>
                <Button
                  variant='default'
                  bd='none'
                  fullWidth
                  leftSection={<IconUserFilled />}
                  onClick={() => {
                    router.push('/profile')
                    setOpened(false)
                  }}>
                  Profile
                </Button>
                <Divider />
                <Button
                  loading={loading}
                  variant='default'
                  bd='none'
                  fullWidth
                  leftSection={<IconLogout2 />}
                  onClick={signOut}>
                  Sign Out
                </Button>
              </>
            ) : (
              <>
                <Button
                  variant='default'
                  bd='none'
                  fullWidth
                  leftSection={<IconLogin2 />}
                  onClick={() => {
                    router.push('/signIn')
                    setOpened(false)
                  }}>
                  Sign In
                </Button>
                <Divider />
                <Button
                  variant='default'
                  bd='none'
                  fullWidth
                  leftSection={<IconUserPlus />}
                  onClick={() => {
                    router.push('/signUp')
                    setOpened(false)
                  }}>
                  Sign Up
                </Button>
              </>
            )}
          </Stack>
        </Popover.Dropdown>
      </Popover>
    </Group>
  )
}
