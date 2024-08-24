import { useColorScheme, useOs, useViewportSize } from '@mantine/hooks'

export function useIsMobile() {
  const os = useOs()
  const { width } = useViewportSize()
  return os === 'ios' || os === 'android' || width < 600
}

export function useIsDarkMode() {
  const theme = useColorScheme()
  return theme === 'dark'
}
