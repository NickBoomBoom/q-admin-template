// uno.config.ts
import { defineConfig } from 'unocss'
import presetUno from '@unocss/preset-uno'
import presetIcons from '@unocss/preset-icons'
export default defineConfig({
  theme: {
    colors: {
      'primary': "#409eff",
      'primary-200': "#79bbff",
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
        'src/router/index.ts' // 解决动态 icon 问题
      ]
    }
  }
})