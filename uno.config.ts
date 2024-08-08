// uno.config.ts
import { defineConfig } from 'unocss'
import presetUno from '@unocss/preset-uno'
import presetIcons from '@unocss/preset-icons'
export default defineConfig({
  theme: {
    colors: {
      'primary': "#409eff",
      'primary200': "#79bbff",
      'hover-primary': '#ecf5ff',
      elGray: '#dcdfe6'
    }
  },
  presets: [
    presetUno(),
    presetIcons({})
  ],
  content: {
    pipeline: {
      include: [
        /\.(vue|svelte|[jt]sx|mdx?|astro|elm|php|phtml|html)($|\?)/,
        'src/router/*.ts' // 解决动态 icon 问题
      ]
    }
  }
})