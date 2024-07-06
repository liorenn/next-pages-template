import { Button, Divider, Drawer, ScrollArea, Stack, rem } from '@mantine/core'
import { useEffect, useState } from 'react'

import { api } from '@/utils/client'
import { useAuthStore } from '@/utils/authStore'
import { useRouter } from 'next/router'

type Props = {
  drawerOpened: boolean
  closeDrawer: () => void
  signOut: () => void
}

export default function NavMenu({ drawerOpened, closeDrawer, signOut }: Props) {
  const router = useRouter()
  const { isAuthed } = useAuthStore()
  const { data, refetch } = api.auth.getUser.useQuery()
  const [activeLink, setActiveLink] = useState(router.asPath)

  useEffect(() => {
    refetch()
    setActiveLink(router.asPath)
  }, [isAuthed, router])

  function getButtons() {
    const buttons = [{ title: 'Home', href: '/' }]

    if (data) {
      buttons.push({ title: 'sign Out', href: '/signOut' })
    } else {
      buttons.push({ title: 'sign In', href: '/signIn' })
      buttons.push({ title: 'sign Up', href: '/signUp' })
    }

    return buttons
  }

  return (
    <Drawer
      opened={drawerOpened}
      onClose={closeDrawer}
      size='76%'
      radius='md'
      title='Menu'
      hiddenFrom='sm'
      zIndex={1000000}
      closeOnEscape
      closeOnClickOutside>
      <ScrollArea h={`calc(100vh - ${rem(80)})`} mx='-md'>
        <Divider my='sm' />
        <Stack>
          {getButtons().map((link, index) => (
            <Button
              variant='light'
              key={index}
              radius='lg'
              right='20px'
              color={link.href === activeLink ? 'dark.3' : 'gray'}
              onClick={() => {
                if (link.title === 'sign Out') {
                  signOut()
                  setActiveLink('/')
                } else {
                  setActiveLink(link.href)
                  router.push(link.href)
                }
                closeDrawer()
              }}>
              {link.title}
            </Button>
          ))}
        </Stack>
      </ScrollArea>
    </Drawer>
  )
}
