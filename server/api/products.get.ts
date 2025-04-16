import { readFile } from 'fs/promises'
import { join } from 'path'

export default defineEventHandler(async () => {
  const filePath = join(process.cwd(), 'assets/data/products.json')
  const fileContent = await readFile(filePath, 'utf-8')
  return JSON.parse(fileContent)
})
