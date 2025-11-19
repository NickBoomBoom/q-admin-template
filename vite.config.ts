import { defineConfig } from 'vite'
import { plugins, alias } from './build'

export default defineConfig({
  plugins,
  resolve: {
    alias
  },
  server: {
    port: 4399,
    host: true,
    proxy: {
      '/api': {
        target: process.env.VITE_API_BASE_URL || 'http://localhost:3000',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api/, '')
      }
    }
  },
  css: {
    preprocessorOptions: {
      scss: {
        additionalData: `@use "@/assets/scss/element-variables.scss" as *;`
      }
    }
  }
})
