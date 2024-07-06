import { createTRPCRouter, method } from '@/server/trpc'
import { createWriteStream, existsSync, mkdirSync } from 'fs'

import { Readable } from 'stream'
import path from 'path'
import z from 'zod'
import { zfd } from 'zod-form-data'

export const dbRouter = createTRPCRouter({
  uploadFile: method
    .input(
      zfd.formData({
        files: z.union([z.array(zfd.file()), zfd.file()]),
      })
    )
    .mutation(async ({ input }) => {
      let files = []
      if (Array.isArray(input.files)) {
        files = await Promise.all(input.files.map((file) => writeFileToDisk(file)))
      } else {
        const fileDetails = await writeFileToDisk(input.files)
        files.push(fileDetails)
      }
      return {
        error: false,
        message: 'Files Uploaded Successfully',
        files: files,
      }
    }),
})

export async function writeFileToDisk(file: File) {
  const nonce = Date.now()
  const baseFolder = __dirname + '/../../../../..'
  const filePath = path.resolve(`${baseFolder}/public/uploads/${nonce}`)

  if (!existsSync(filePath)) {
    mkdirSync(filePath, { recursive: true })
  }

  const writeStream = createWriteStream(path.resolve(`${filePath}/${file.name}`))
  const fileStream = Readable.fromWeb(
    // @ts-expect-error
    file.stream()
  )
  for await (const chunk of fileStream) {
    writeStream.write(chunk)
  }
  writeStream.end()

  return {
    url: `/uploads/${nonce}/${file.name}`,
    name: file.name,
  }
}
