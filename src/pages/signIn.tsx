import { Anchor, Button, Group, Paper } from '@mantine/core'
import { PasswordInput, Stack, Text, TextInput } from '@mantine/core'

import AuthPage from '@/components/pages/AuthPage'
import { api } from '@/lib/trpc'
import { createNotification } from '@/lib/utils'
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
        },
      }
    )
  }

  return (
    <AuthPage title='Sign In' container={600}>
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
              Do not have an account? Register
            </Anchor>
            <Button color='dark.5' type='submit' radius='xl' loading={loading}>
              Sign In
            </Button>
          </Group>
        </form>
      </Paper>
    </AuthPage>
  )
}
