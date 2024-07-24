import type { RouteRecordRaw } from 'vue-router'

export default [{
  path: "https://www.google.com",
  meta: {
    title: 'Google',
    icon: "i-mdi-link-variant",
    link: "https://www.google.com",
  },
  component: () => null
}] as RouteRecordRaw[]
