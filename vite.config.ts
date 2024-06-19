import { defineConfig } from 'vite'
import { plugins, alias } from './build'

// https://vitejs.dev/config/
export default defineConfig({
  plugins,
  resolve: {
    alias
  }
})
