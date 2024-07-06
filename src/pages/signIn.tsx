import { Anchor, Button, Container, Group, Paper } from '@mantine/core'
import { PasswordInput, Stack, Text, TextInput } from '@mantine/core'

import AuthPage from '@/components/layout/AuthPage'
import Head from 'next/head'
import { api } from '@/client/trpc'
import { createNotification } from '@/client/utils'
import { useForm } from '@mantine/form'
import { useRouter } from 'next/router'
import { useState } from 'react'

type SignInForm = {
  email: string
  password: string
}

export default function SignIn() {
  const router = useRouter()
  const [loading, setLoading] = useState(false)
  const { mutate: signIn } = api.auth.signIn.useMutation()

  const form = useForm<SignInForm>({
    initialValues: {
      email: 'email@gmail.com',
      password: '1hdJG86Dkf',
    },
  })

  const handleSubmit = (values: SignInForm) => {
    setLoading(true)
    signIn(
      { email: values.email, password: values.password },
      {
        onSuccess(data) {
          setLoading(false)
          createNotification(data)
          if (!data.error) {
            router.push('/')
          }
        },
      }
    )
  }

  return (
    <AuthPage>
      <Head>
        <title>Sign In</title>
      </Head>
      <Container size={800}>
        <Paper radius='md' p='xl' withBorder>
          <Text size='lg' fw={500} mb='md'>
            Sign In to Your Account
          </Text>

          <form onSubmit={form.onSubmit((values) => handleSubmit(values))}>
            <Stack>
              <TextInput
                required
                label='Email'
                placeholder='Enter Your Email...'
                {...form.getInputProps('email')}
                radius='md'
              />

              <PasswordInput
                required
                label='Password'
                placeholder='Enter Your Password...'
                {...form.getInputProps('password')}
                radius='md'
              />
            </Stack>

            <Group justify='space-between' mt='xl'>
              <Anchor
                c='dark.2'
                component='button'
                type='button'
                onClick={() => router.push('signUp')}
                size='sm'>
                Don't have an account? Register
              </Anchor>
              <Button color='dark.5' type='submit' radius='xl' loading={loading}>
                Sign In
              </Button>
            </Group>
          </form>
        </Paper>
      </Container>
    </AuthPage>
  )
}
