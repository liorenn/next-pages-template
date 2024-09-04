import { Button, Group, Image, List, SimpleGrid } from '@mantine/core'
import { Stack, Text, ThemeIcon, Title, rem } from '@mantine/core'

import { IconCheck } from '@tabler/icons-react'
import Page from '@/components/pages/Page'
import hero from '../../public/hero.svg'

export default function Home() {
  return (
    <Page title='Home' container='md'>
      <SimpleGrid
        mt={60}
        verticalSpacing='xl'
        cols={{
          lg: 2,
          md: 1,
        }}>
        <Stack>
          <Title>
            A modern React <br /> components library
          </Title>
          <Text c='dimmed' mt='md'>
            Build fully functional accessible web applications faster than ever - Mantine includes
            more than 120 customizable components and hooks to cover you in any situation
          </Text>

          <List
            mt={30}
            spacing='sm'
            size='sm'
            icon={
              <ThemeIcon size={20} radius='xl'>
                <IconCheck style={{ width: rem(12), height: rem(12) }} stroke={1.5} />
              </ThemeIcon>
            }>
            <List.Item>
              <b>TypeScript based</b> – build type safe applications, all components and hooks
              export types
            </List.Item>
            <List.Item>
              <b>Free and open source</b> – all packages have MIT license, you can use Mantine in
              any project
            </List.Item>
            <List.Item>
              <b>No annoying focus ring</b> – focus ring will appear only when user navigates with
              keyboard
            </List.Item>
          </List>

          <Group mt={30}>
            <Button radius='xl' size='md'>
              Get started
            </Button>
            <Button radius='xl' size='md'>
              Get started
            </Button>
            <Button variant='default' radius='xl' size='md'>
              Source code
            </Button>
          </Group>
        </Stack>
        <Image src={hero.src} alt='Hero image' h='auto' w='auto' />
      </SimpleGrid>
    </Page>
  )
}
