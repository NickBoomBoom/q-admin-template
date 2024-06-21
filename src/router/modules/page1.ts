import type { RouteRecordRaw } from 'vue-router'

export default {
  path: "page1",
  meta: {
    title: "页面1",
    icon: "i-mdi-office-building"
  },
  children: [
    {
      path: 'page1-1',
      name: "Page1-1",
      meta: {
        title: '页面1',
        icon: "i-mdi-office-building"

      },
      component: () => import('../../pages/one/index.vue'),
    },
    {
      path: 'page1',
      name: "OnePage1",
      meta: {
        title: '页面 2',
        icon: "i-mdi-office-building"

      },
      component: () => import('../../pages/one-1/index.vue')
    }
  ]
} as RouteRecordRaw