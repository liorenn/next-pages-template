import { Center } from '@mantine/core'
import { Loader as MantineLoader } from '@mantine/core'

export default function Loader() {
  return (
    <>
      <Center>
        <MantineLoader color='gray' size={60} variant='dots' />
      </Center>
    </>
  )
}
