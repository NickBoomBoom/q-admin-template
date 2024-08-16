import vue from '@vitejs/plugin-vue'
import vueJsx from '@vitejs/plugin-vue-jsx'
import UnoCSS from 'unocss/vite'
import AutoImport from 'unplugin-auto-import/vite'
import Components from 'unplugin-vue-components/vite'
import { ElementPlusResolver } from 'unplugin-vue-components/resolvers'
import { PlusProComponentsResolver } from '@plus-pro-components/resolver'
// @ts-ignore
import oxlintPlugin from 'vite-plugin-oxlint'

export const plugins = [
  vue(),
  vueJsx(),
  UnoCSS(),
  oxlintPlugin(),
  AutoImport({
    dts: './src/types/auto-import.d.ts',
    imports: ["vue", "vue-router", 'pinia'],
    // 以下这些目录下不需要用index暴露出去,AutoImport会自动帮忙导入
    dirs: ['./src/stores', './src/services', './src/utils', './src/utils', './src/api'],
    resolvers: [ElementPlusResolver()],
  }),
  Components({
    dirs: [
      './src/components',
      './src/layouts'
    ],
    dts: "./src/types/components.d.ts",
    resolvers: [ElementPlusResolver(), PlusProComponentsResolver()]
  })
]
