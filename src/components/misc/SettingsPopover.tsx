import { ActionIcon, Center, ColorSwatch, Divider, Group, Popover } from '@mantine/core'
import { IconBrush, IconSunMoon } from '@tabler/icons-react'
import { SegmentedControl, Slider, Stack, Text, useMantineColorScheme } from '@mantine/core'
import { colors, themeOptions } from '@/config'

import HoverBox from '@/components/misc/HoverBox'
import { capitilizeString } from '@/lib/utils'
import { useThemeStore } from '@/hooks/useThemeStore'
import { useViewportSize } from '@mantine/hooks'

export default function SettingsPopover() {
  const { width } = useViewportSize()
  const { setPrimaryColor, setScale, primaryColor, scale } = useThemeStore()
  const { setColorScheme, colorScheme } = useMantineColorScheme()

  return (
    <Group>
      <Popover offset={10} shadow='md' width={260}>
        <Popover.Target>
          <ActionIcon radius='md' size='lg' variant={width > 400 ? 'subtle' : 'light'}>
            <IconBrush size={20} />
          </ActionIcon>
        </Popover.Target>
        <Popover.Dropdown p='sm'>
          <Stack gap='xs'>
            <Text>Change Color Scheme</Text>
            <SegmentedControl
              transitionDuration={1000}
              fullWidth
              p={4}
              data={themeOptions.map((key) => {
                return {
                  value: key,
                  label: (
                    <Center style={{ gap: 4 }}>
                      <IconSunMoon size={16} />
                      <Text size='sm'>{capitilizeString(key)}</Text>
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
              value={primaryColor}
              withItemsBorders={false}
              onChange={setPrimaryColor}
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
                  value: color,
                  label: (
                    <HoverBox disabled={color === primaryColor}>
                      <ColorSwatch size={30} color={`var(--mantine-color-${color}-5)`} />
                    </HoverBox>
                  ),
                }
              })}
            />
            <Divider />
            <Text>Change Website Scaling</Text>
            <Slider
              defaultValue={1}
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
          </Stack>
        </Popover.Dropdown>
      </Popover>
    </Group>
  )
}
