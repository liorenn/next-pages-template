import { IconCheck, IconExclamationMark, IconX } from '@tabler/icons-react'

import { rem } from '@mantine/core'
import { showNotification as showNotificationMantine } from '@mantine/notifications'

export type ActionResponse = {
  message: string
  error: boolean
}

const icons = [
  { color: 'red', icon: <IconX style={{ width: rem(18), height: rem(18) }} /> },
  { color: 'yellow', icon: <IconExclamationMark style={{ width: rem(18), height: rem(18) }} /> },
  { color: 'green', icon: <IconCheck style={{ width: rem(18), height: rem(18) }} /> },
]

export function createNotification(response: ActionResponse) {
  showNotification(response.message, response.error ? 'red' : 'green')
}

export function showNotification(
  message: string,
  color: 'red' | 'green' | 'yellow',
  mobile?: boolean
) {
  const icon = icons.find((i) => i.color === color)?.icon

  return showNotificationMantine({
    title: message,
    message: '',
    color: color,
    autoClose: 6000,
    radius: 'md',
    icon: icon,
    style: { width: '60%', float: 'right', marginBottom: mobile ? '40px' : '' },
  })
}

export function capitilizeString(str: string) {
  return str
    .split(' ')
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
    .join(' ')
}
