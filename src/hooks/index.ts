import { useColorScheme, useOs } from '@mantine/hooks'

export function useIsMobile() {
  const os = useOs()
  return os === 'android' || os === 'ios'
}

export function useIsDarkMode() {
  const colorScheme = useColorScheme()
  return colorScheme === 'dark'
}
