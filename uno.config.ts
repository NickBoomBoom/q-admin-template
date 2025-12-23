import { defineConfig, presetIcons, presetWind3 } from "unocss";
export default defineConfig({
  theme: {
    colors: {
      primary: "var(--el-color-primary)", // 默认值可选
      success: "var(--el-color-success)",
      warning: "var(--el-color-warning)",
      danger: "var(--el-color-danger)",
      info: "var(--el-color-info)",
    },
  },
  presets: [presetWind3(), presetIcons()],
  content: {
    pipeline: {
      include: [
        "src/**/*.{vue,ts,tsx,js,jsx,html}",
        "src/router/*.ts", // 解决动态 icon 问题
      ],
    },
  },
});
