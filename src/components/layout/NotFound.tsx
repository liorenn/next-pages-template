import { Button, Center, Container, Grid, Stack, Text, Title } from '@mantine/core'

import { useRouter } from 'next/router'

export default function NotFound({ title }: { title: string }) {
  const router = useRouter()

  return (
    <Container size='xl'>
      <Center h='80vh'>
        <Stack align='center'>
          <Title>{title} Not Found</Title>
          <Text>
            The {title} you are looking for does not exist
            <br /> Check the URL or go back to the homepage
          </Text>
          <Grid>
            <Grid.Col span={{ base: 12, xs: 'auto' }}>
              <Button fullWidth variant='default' color='dark' onClick={() => router.back()}>
                Go to Previous Page
              </Button>
            </Grid.Col>
            <Grid.Col span={{ base: 12, xs: 'auto' }}>
              <Button fullWidth variant='default' color='dark' onClick={() => router.replace('/')}>
                Go to Home Page
              </Button>
            </Grid.Col>
          </Grid>
        </Stack>
      </Center>
    </Container>
  )
}
