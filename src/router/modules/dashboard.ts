import type { RouteRecordRaw } from 'vue-router'

export default [{
  path: "dashboard",
  name: "Dashboard",
  meta: {
    title: 'Dashboard',
    icon: "i-mdi-home"
  },
  component: () => import('../../pages/dashboard/index.vue')
}] as RouteRecordRaw[]
