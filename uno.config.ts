import { defineConfig, presetIcons, presetWind3 } from 'unocss';
export default defineConfig({
  theme: {
    colors: {
      primary: 'rgb(250, 112, 46)',
      success: 'rgb(67, 147, 108)',
      warning: 'rgb(252, 200, 0)',
      danger: 'rgb(233, 72, 62)',
      info: 'rgb(233, 72, 62)',
    },
  },
  presets: [presetWind3(), presetIcons()],
  content: {
    pipeline: {
      include: [
        'src/**/*.{vue,ts,tsx,js,jsx,html}',
        'src/router/*.ts', // 解决动态 icon 问题
      ],
    },
  },
});
