import type { RouteRecordRaw } from 'vue-router'

export default {
  path: "tree",
  meta: {
    title: "页面",
    icon: "i-mdi-office-building"
  },
  children: [
    {
      path: 'index',
      name: "Tree",
      meta: {
        title: '页面 1',
        icon: "i-mdi-office-building-outline"
      },
      component: () => import('../../pages/one/index.vue'),
    },
    {
      path: 'page1',
      name: "TreePage1",
      meta: {
        title: '页面 2',
        icon: "i-mdi-office-building-outline"
      },
      component: () => import('../../pages/one-1/index.vue')
    }
  ]
} as RouteRecordRaw