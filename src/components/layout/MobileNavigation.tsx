import { IconCode, IconExternalLink, IconEye, IconHome } from '@tabler/icons-react'
import { SegmentedControl, Stack, Text, parseThemeColor, useMantineTheme } from '@mantine/core'
import { cloneElement, useEffect, useState } from 'react'

import { useRouter } from 'next/router'

function getMobileButtons(color: string, value: string, size: number = 20) {
  const buttons = [
    { value: '', label: 'Home', icon: <IconHome size={size} /> },
    { value: 'signIn', label: 'Page 1', icon: <IconEye size={size} /> },
    { value: 'signUp', label: 'Page 2', icon: <IconCode size={size} /> },
    { value: 'devices', label: 'Devices', icon: <IconExternalLink size={size} /> },
  ]
  return buttons.map((button) => {
    if (button.value === value) {
      return {
        ...button,
        icon: cloneElement(button.icon, { color }),
      }
    }
    return button
  })
}

export default function MobileNavigation() {
  const router = useRouter()
  const theme = useMantineTheme()
  const color = parseThemeColor({
    color: theme.primaryColor,
    theme,
  }).value
  const [value, setValue] = useState(
    getMobileButtons(color, router.asPath.slice(1)).find(
      (value) => router.asPath.slice(1) === value.value
    )?.value
  )

  useEffect(() => {
    setValue(
      getMobileButtons(color, router.asPath.slice(1)).find(
        (value) => router.asPath.slice(1) === value.value
      )?.value
    )
  }, [router.asPath])

  return (
    <SegmentedControl
      radius='sm'
      withItemsBorders={false}
      value={value}
      fullWidth
      onChange={(value) => {
        setValue(value)
        router.push(`/${value}`)
      }}
      p={0}
      styles={{
        control: {
          paddingBottom: 5,
          backgroundColor: 'inherit',
        },
      }}
      data={getMobileButtons(color, value ?? router.asPath.slice(1)).map(
        ({ value: href, label, icon }) => ({
          value: href,
          label: (
            <Stack pt={5} gap={4} justify='center' align='center'>
              {icon}
              <Text c={value === href ? color : 'inherit'} fw='bold' size='10px'>
                {label}
              </Text>
            </Stack>
          ),
        })
      )}
    />
  )
}
