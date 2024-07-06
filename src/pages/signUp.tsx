import { Anchor, Button, Checkbox, Container, Group } from '@mantine/core'
import { Paper, PasswordInput, Stack, Text, TextInput } from '@mantine/core'

import AuthPage from '@/components/layout/AuthPage'
import Head from 'next/head'
import { api } from '@/utils/client'
import { createNotification } from '@/utils/utils'
import { useAuthStore } from '@/utils/authStore'
import { useForm } from '@mantine/form'
import { useRouter } from 'next/router'
import { useState } from 'react'

type SignUpForm = {
  name: string
  email: string
  password: string
  terms: boolean
}

export default function SignUp() {
  const router = useRouter()
  const { setIsAuthed } = useAuthStore()
  const [loading, setLoading] = useState(false)
  const { mutate: signUp } = api.auth.signUp.useMutation()

  const form = useForm<SignUpForm>({
    initialValues: {
      name: 'John Doe',
      email: 'email@gmail.com',
      password: '1hdJG86Dkf',
      terms: true,
    },
  })

  const handleSubmit = (values: SignUpForm) => {
    setLoading(true)
    signUp(
      { email: values.email, name: values.name, password: values.password },
      {
        onSuccess(data) {
          setLoading(false)
          createNotification(data)
          if (!data.error) {
            setIsAuthed(true)
            router.push('/')
          }
        },
      }
    )
  }

  return (
    <AuthPage>
      <Head>
        <title>Sign Up</title>
      </Head>
      <Container size={800}>
        <Paper radius='md' p='xl' withBorder>
          <Text size='lg' fw={500} mb='md'>
            Sign Up Your Account
          </Text>

          <form onSubmit={form.onSubmit((values) => handleSubmit(values))}>
            <Stack>
              <TextInput
                required
                label='Name'
                placeholder='Enter Your Name...'
                value={form.values.name}
                {...form.getInputProps('name')}
                radius='md'
              />

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

              <Checkbox
                color='gray'
                required
                label='I accept terms and conditions'
                checked={form.values.terms}
                {...form.getInputProps('terms')}
              />
            </Stack>

            <Group justify='space-between' mt='xl'>
              <Anchor
                c='dark.2'
                component='button'
                type='button'
                onClick={() => router.push('signIn')}
                size='sm'>
                Already have an account? Login
              </Anchor>
              <Button color='dark.5' type='submit' radius='xl' loading={loading}>
                Sign Up
              </Button>
            </Group>
          </form>
        </Paper>
      </Container>
    </AuthPage>
  )
}
