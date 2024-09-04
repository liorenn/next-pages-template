import { ActionIcon, Button, Center, ColorSwatch, Divider, Group, Popover } from '@mantine/core'
import { IconBrush, IconSettingsFilled, IconSunMoon } from '@tabler/icons-react'
import { SegmentedControl, Slider, Stack, Text, useMantineColorScheme } from '@mantine/core'
import { colors, useThemeStore } from '@/hooks/useThemeStore'

import HoverBox from '@/components/misc/HoverBox'
import { capitilizeString } from '@/lib/utils'
import { useIsDarkMode } from '@/hooks/common'
import { useViewportSize } from '@mantine/hooks'

export default function SettingsPopover() {
  const { width } = useViewportSize()
  const { setPrimaryColor, setScale, primaryColor, scale } = useThemeStore()
  const { setColorScheme, colorScheme } = useMantineColorScheme()
  const dark = useIsDarkMode()

  return (
    <Group>
      <Popover offset={10} shadow='md' width={320}>
        <Popover.Target>
          <ActionIcon radius='md' size='lg' variant={width > 400 ? 'subtle' : 'light'}>
            <IconSettingsFilled size={20} />
          </ActionIcon>
        </Popover.Target>
        <Popover.Dropdown p='sm'>
          <Stack gap='xs'>
            <Text>Change Color Scheme</Text>
            <SegmentedControl
              fullWidth
              p={4}
              data={['dark', 'light', 'auto'].map((mode) => {
                return {
                  value: mode,
                  label: (
                    <Center style={{ gap: 4 }}>
                      <IconSunMoon size={16} />
                      <Text size='sm'>{capitilizeString(mode)}</Text>
                    </Center>
                  ),
                }
              })}
              value={colorScheme}
              onChange={(value) => setColorScheme(value as 'dark' | 'light' | 'auto')}
            />
            <Divider />
            <Text>Change Color Theme</Text>
            <SegmentedControl
              bg='transparent'
              value={primaryColor.name}
              withItemsBorders={false}
              onChange={(value) => {
                setPrimaryColor(
                  value === 'adaptive'
                    ? { name: 'adaptive', color: dark ? 'white' : 'black' }
                    : {
                        name: value,
                        color: colors.find((color) => color.name === value)?.color || 'blue',
                      }
                )
              }}
              styles={{
                root: {
                  gap: 12,
                },
                label: {
                  padding: 8,
                },
              }}
              data={colors.map((color) => {
                return {
                  value: color.name,
                  label: (
                    <HoverBox disabled={color.name === primaryColor.name}>
                      <ColorSwatch size={30} color={`var(--mantine-color-${color.color}-7)`} />
                    </HoverBox>
                  ),
                }
              })}
            />
            <Divider />
            <Text>Change Website Scaling</Text>
            <Slider
              value={scale}
              step={0.001}
              min={0.8}
              max={1.2}
              onChange={setScale}
              styles={{
                thumb: {
                  transition: 'opacity 150ms ease',
                  opacity: 0,
                },
              }}
            />
            <Button
              fullWidth
              variant='default'
              onClick={() => {
                setScale(1)
              }}>
              Restore To Default
            </Button>
          </Stack>
        </Popover.Dropdown>
      </Popover>
    </Group>
  )
}
