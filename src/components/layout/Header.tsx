import { Button, Group, Text, parseThemeColor, useMantineTheme } from '@mantine/core'

import AuthPopover from '../misc/AuthPopover'
import { IconBrandAppleFilled } from '@tabler/icons-react'
import SettingsPopover from '@/components/misc/SettingsPopover'
import { api } from '@/lib/trpc'
import { createNotification } from '@/lib/utils'
import { useRouter } from 'next/router'
import { useState } from 'react'
import { useViewportSize } from '@mantine/hooks'

export type Link = {
  label: string
  href?: string
  loading?: boolean
  onClick?: () => void
}

export default function Header() {
  const { width } = useViewportSize()
  const [loading, setLoading] = useState(false)
  const { mutate: signOutMutation } = api.auth.signOut.useMutation()
  const { data } = api.auth.getUser.useQuery()
  const theme = useMantineTheme()
  const router = useRouter()

  function signOut() {
    setLoading(true)
    signOutMutation(undefined, {
      onSuccess(data) {
        setLoading(false)
        createNotification(data)
      },
    })
  }

  function HeaderButton(link: Link) {
    return (
      <Button
        visibleFrom='xs'
        variant={width > 400 ? 'subtle' : 'light'}
        radius='md'
        color='dark.1'
        onClick={link.onClick || (() => router.push(link.href ?? '/'))}
        loading={link.loading}>
        <Text fw='bold'>{link.label}</Text>
      </Button>
    )
  }

  return (
    <Group mx='md' h={56} align='center' justify='space-between'>
      <Group>
        <IconBrandAppleFilled
          size={30}
          color={
            parseThemeColor({
              color: theme.primaryColor,
              theme,
            }).value
          }
        />
        <Group visibleFrom='sm'>
          <HeaderButton href='/' label='Home' />
          <HeaderButton href='/page1' label='Page 1' />
          <HeaderButton href='/page2' label='Page 2' />
        </Group>
      </Group>
      <Group>
        {data ? (
          <HeaderButton label='Sign Out' loading={loading} onClick={signOut} />
        ) : (
          <>
            <HeaderButton href='/signIn' label='Sign In' />
            <HeaderButton href='/signUp' label='Sign Up' />
          </>
        )}
        <SettingsPopover />
        <AuthPopover />
      </Group>
    </Group>
  )
}
