import { Container } from '@mantine/core'
import FileUpload from '@/components/misc/FileUpload'
import Head from 'next/head'

export default function Home() {
  return (
    <>
      <Head>
        <title>Home</title>
      </Head>
      <Container size={1400}>
        Hello
        <FileUpload />
      </Container>
    </>
  )
}
