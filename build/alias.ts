
import { fileURLToPath, URL } from 'node:url'

export const alias = {
  '@': fileURLToPath(new URL('../src', import.meta.url)),
  '@pages': fileURLToPath(new URL('../src/pages', import.meta.url)),
  '@components': fileURLToPath(new URL('../src/components', import.meta.url)),
  '@layouts': fileURLToPath(new URL('../src/layouts', import.meta.url)),
  '@services': fileURLToPath(new URL('../src/services', import.meta.url)),
  '@stores': fileURLToPath(new URL('../src/stores', import.meta.url)),
}