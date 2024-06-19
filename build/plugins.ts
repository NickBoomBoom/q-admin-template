import vue from '@vitejs/plugin-vue'
import vueJsx from '@vitejs/plugin-vue-jsx'
import UnoCSS from 'unocss/vite'
import AutoImport from 'unplugin-auto-import/vite'
import Components from 'unplugin-vue-components/vite'
import { ElementPlusResolver } from 'unplugin-vue-components/resolvers'
import oxlintPlugin from 'vite-plugin-oxlint'

export const plugins = [
  vue(),
  vueJsx(),
  UnoCSS(),
  oxlintPlugin(),
  AutoImport({
    dts: './types/auto-import.d.ts',
    imports: ["vue", "vue-router", 'pinia'],
    dirs: ['./src/stores', './src/services', './src/utils'],
    resolvers: [ElementPlusResolver()],
  }),
  Components({
    dirs: [
      './src/components',
      './src/layouts'
    ],
    dts: "./types/components.d.ts",
    resolvers: [ElementPlusResolver()],
  })
]
