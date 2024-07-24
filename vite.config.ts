import { defineConfig } from 'vite'
import { plugins, alias } from './build'

// https://vitejs.dev/config/
export default defineConfig({
  plugins,
  resolve: {
    alias
  },
  server: {
    port: 4399,
    proxy: {
      '/api': {
        target: 'xxxx',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api/, '')
      },

    }
  }
})
