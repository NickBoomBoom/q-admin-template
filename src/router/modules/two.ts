import type { RouteRecordRaw } from 'vue-router'

export default {
  path: "two",
  name: "Two",
  meta: {
    title: '页面 2',
    icon: "i-mdi-office-building"
  },
  component: () => import('../../pages/two/index.vue'),
} as RouteRecordRaw