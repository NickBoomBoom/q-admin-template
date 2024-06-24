import type { RouteRecordRaw } from 'vue-router'

export default {
  path: "page1",
  meta: {
    title: "页面1",
    icon: "i-mdi-office-building"
  },
  children: [
    {
      path: 'index',
      name: "Page1index",
      meta: {
        title: '页面1首页',
        icon: "i-mdi-office-building"

      },
      component: () => import('../../pages/page1/index.vue'),
    },
    {
      path: 'page1-1',
      name: "Page1-1",
      meta: {
        title: '页面1-1',
        icon: "i-mdi-office-building"

      },
      children: [
        {
          path: "index",
          name: "Page1-1-one-index",
          meta: {
            title: "页面 1-1 首页",
          },
          component: () => import('../../pages/page1/page1-1/index.vue')
        },
        {
          path: '-1',
          name: "Page1-1-1",
          meta: {
            title: "页面 1-1-1"
          },
          children: [

            {
              path: "index",
              name: "Page1-1-1index",
              meta: {
                title: "页面 1-1-1 首页",
              },
              component: () => import('../../pages/page1/page1-1/page1-1-1/index.vue')
            },
          ]
        }
      ]
    }
  ]
} as RouteRecordRaw