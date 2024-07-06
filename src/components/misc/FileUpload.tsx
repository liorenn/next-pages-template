import { Button, FileInput, Group, Image } from '@mantine/core'

import { api } from '@/client/trpc'
import { createNotification } from '@/client/utils'

export default function FileUpload() {
  const mutation = api.db.uploadFile.useMutation({
    onSuccess: (data) => {
      createNotification(data)
    },
  })

  return (
    <>
      <h1>Upload Form</h1>
      <form
        method='post'
        action={`/api/trpc/${mutation.trpc.path}`}
        encType='multipart/form-data'
        onSubmit={(e) => {
          const formData = new FormData(e.currentTarget)
          mutation.mutate(formData)
          e.preventDefault()
        }}>
        <Group>
          <FileInput name='files' placeholder='Upload Your Files...' multiple />
          <Button type='submit' loading={mutation.isPending} variant='default'>
            Upload
          </Button>
        </Group>
      </form>
      {mutation.data && (
        <>
          <h1>Upload Results</h1>
          <Group>
            {mutation.data.files.map((file, index) => {
              const allowedExtensions = ['jpg', 'jpeg', 'png', 'gif']
              if (allowedExtensions.some((ext) => file.name.includes(ext))) {
                return <Image key={index} src={file.url} h={200} />
              }
            })}
          </Group>
        </>
      )}
    </>
  )
}
