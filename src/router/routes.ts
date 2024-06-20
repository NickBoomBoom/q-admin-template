import LayoutBase from '@layouts/layout-base/index.vue'
import type { RouteRecordRaw } from 'vue-router'

import dashboardRoutes from './modules/dashboard'
import oneRoutes from './modules/one'
import twoRoutes from './modules/two'
import treeRoutes from './modules/tree'

export const commonRoutes: RouteRecordRaw[] = [
  {
    path: "/login",
    name: "Login",
    component: () => import('../pages/login/index.vue')
  },
  {
    path: "/403",
    name: "403",
    component: () => import('../pages/error/403.vue')
  },
  {
    path: "/404",
    name: "404",
    component: () => import('../pages/error/404.vue')
  },
]

export const menuRoutes: RouteRecordRaw[] = [
  dashboardRoutes,
  oneRoutes,
  twoRoutes,
  treeRoutes,

  {
    path: "https://www.google.com",
    meta: {
      title: '外部链接',
      icon: "i-mdi-office-building",
      link: "https://www.google.com",
    },
    component: () => null
  }
]

export const routes: RouteRecordRaw[] = [
  {
    path: '/',
    component: LayoutBase,
    children: menuRoutes,
  },
  ...commonRoutes,
]


export function getRoutes() {
  return filterRoutes(routes)
}

function filterRoutes(arr: RouteRecordRaw[]): RouteRecordRaw[] {
  const res: RouteRecordRaw[] = []
  arr.forEach(t => {
    if (!t.meta?.link) {
      if (t.children && t.children.length) {
        t.children = filterRoutes(t.children)
      }

      res.push(t)
    }
  })
  return res
}