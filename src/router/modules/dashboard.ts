import type { RouteRecordRaw } from 'vue-router'

export default {
  path: "dashboard",
  name: "Dashboard",
  meta: {
    title: '面板',
    icon: "i-mdi-office-building"
  },
  component: () => import('../../pages/dashboard/index.vue')
} as RouteRecordRaw
