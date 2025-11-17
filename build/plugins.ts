import vue from '@vitejs/plugin-vue'
import UnoCSS from 'unocss/vite'
import AutoImport from 'unplugin-auto-import/vite'
import Components from 'unplugin-vue-components/vite'
import { ElementPlusResolver } from 'unplugin-vue-components/resolvers'
import { PlusProComponentsResolver } from '@plus-pro-components/resolver'

export const plugins = [
  vue(),
  UnoCSS(),
  AutoImport({
    dts: './src/types/auto-import.d.ts',
    imports: ['vue', 'vue-router', 'pinia'],
    dirs: ['./src/stores', './src/services', './src/utils', './src/utils', './src/api'],
    resolvers: [ElementPlusResolver()]
    // resolvers: [ElementPlusResolver({ importStyle: 'sass' })]
  }),
  Components({
    dirs: ['./src/components', './src/layouts'],
    dts: './src/types/components.d.ts',
    resolvers: [ElementPlusResolver(), PlusProComponentsResolver()]
    // resolvers: [ElementPlusResolver( { importStyle: 'sass' }), PlusProComponentsResolver()]
  })
]
