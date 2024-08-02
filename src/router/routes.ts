import type { RouteRecordRaw } from 'vue-router'
import Layouts from '@layouts/index.vue'
import dashboardRoutes from './modules/dashboard'
import linkRoutes from './modules/link'
import tableRoutes from './modules/table'
import panelRoutes from './modules/panel'
export const commonRoutes: RouteRecordRaw[] = [
  {
    path: "/login",
    name: "Login",
    meta: {
      title: '登录'
    },
    component: () => import('../pages/login/index.vue')
  },
  {
    path: "/403",
    name: "403",
    meta: {
      title: '403'
    },
    component: () => import('../pages/error/403.vue')
  },
  {
    path: "/404",
    name: "404",
    meta: {
      title: '404'
    },
    component: () => import('../pages/error/404.vue')
  },
  {
    path: '/refresh',
    name: 'Refresh',
    redirect: '/'
  },
  {
    path: '/:pathMatch(.*)*',
    redirect: {
      name: '404'
    }
  }
]

export const WHITE_LIST = ['Login', '403', '404', 'Refresh']

export const menuRoutes: RouteRecordRaw[] = [
  ...dashboardRoutes,
  ...tableRoutes,
  ...panelRoutes,
  ...linkRoutes,
]

export const routes: RouteRecordRaw[] = [
  {
    path: '/',
    component: Layouts,
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