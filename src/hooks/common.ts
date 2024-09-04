import { useColorScheme, useOs, useViewportSize } from '@mantine/hooks'

import { useMantineColorScheme } from '@mantine/core'

export function useIsMobile() {
  const os = useOs()
  const { width } = useViewportSize()
  return os === 'ios' || os === 'android' || width < 600
}

export function useIsDarkMode() {
  const osColorScheme = useColorScheme()
  const { colorScheme } = useMantineColorScheme()
  return colorScheme === 'dark' || (colorScheme === 'auto' && osColorScheme === 'dark')
}
