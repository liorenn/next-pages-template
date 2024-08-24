import { IconCode, IconExternalLink, IconEye, IconHome } from '@tabler/icons-react'
import { SegmentedControl, Stack, Text } from '@mantine/core'

import { useRouter } from 'next/router'

const mobileButtons = [
  { value: '', label: 'Home', icon: <IconHome size={16} /> },
  { value: 'signIn', label: 'Page 1', icon: <IconEye size={16} /> },
  { value: 'signUp', label: 'Page 2', icon: <IconCode size={16} /> },
  { value: 'devices', label: 'Devices', icon: <IconExternalLink size={16} /> },
]

export default function MobileNavigation() {
  const router = useRouter()

  return (
    <SegmentedControl
      radius='md'
      withItemsBorders={false}
      defaultValue={mobileButtons.find((value) => router.asPath.slice(1) === value.value)?.value}
      fullWidth
      onChange={(value) => {
        router.push(`/${value}`)
      }}
      p={5}
      styles={{
        label: {
          padding: 0,
        },
      }}
      data={mobileButtons.map(({ value, label, icon }) => ({
        value,
        label: (
          <Stack pt={5} gap={2} justify='center' align='center'>
            {icon}
            <Text fw='bold' size='xs'>
              {label}
            </Text>
          </Stack>
        ),
      }))}
    />
  )
}
