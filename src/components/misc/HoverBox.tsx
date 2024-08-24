import { Center } from '@mantine/core'
import { useHover } from '@mantine/hooks'

type Props = { children: React.ReactNode; disabled?: boolean }

export default function HoverBox({ children, disabled = false }: Props) {
  const { hovered, ref } = useHover()

  return (
    <Center ref={ref} opacity={!disabled && hovered ? 0.8 : 1}>
      {children}
    </Center>
  )
}
