import type { RouteRecordRaw } from 'vue-router'

export default [{
  path: "https://www.google.com",
  meta: {
    title: 'Google',
    icon: "i-material-symbols-attach-file-rounded",
    link: "https://www.google.com",
  },
  component: () => null
}] as RouteRecordRaw[]
