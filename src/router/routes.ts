import type { RouteRecordRaw } from 'vue-router'
import Layouts from '@layouts/index.vue'
export const menuRoutes: RouteRecordRaw[] = [
  {
    path: 'dashboard',
    name: 'Dashboard',
    meta: {
      title: 'Dashboard',
      icon: 'i-material-symbols-dashboard'
    },
    component: () => import('@pages/dashboard/index.vue')
  },
  {
    path: 'panel',
    name: 'Panel',
    meta: {
      title: 'Panel',
      icon: 'i-material-symbols-space-dashboard-sharp'
    },
    children: [
      {
        path: 'index',
        name: 'PanelIndex',
        meta: {
          title: '总面板',
          icon: 'i-material-symbols-cards'
        },
        component: () => import('@pages/panel/index.vue')
      },
      {
        path: 'one',
        name: 'PanelOne',
        meta: {
          title: '面板一',
          icon: 'i-material-symbols-calendar-today'
        },
        component: () => import('@pages/panel/panel-1/index.vue')
      },
      {
        path: 'two',
        name: 'PanelTwo',
        meta: {
          title: '面板二',
          icon: 'i-material-symbols-sentiment-calm-outline-rounded'
        },
        component: () => import('@pages/panel/panel-2/index.vue')
      }
    ]
  },
  {
    path: 'table',
    name: 'Table',
    meta: {
      title: 'Table',
      icon: 'i-material-symbols-table-chart-view'
    },
    component: () => import('@pages/table/index.vue')
  },
  {
    path: 'https://www.google.com',
    meta: {
      title: 'Google',
      icon: 'i-material-symbols-attach-file-rounded',
      link: 'https://www.google.com'
    },
    component: () => null
  }
]
export const commonRoutes: RouteRecordRaw[] = [
  {
    path: '/login',
    name: 'Login',
    meta: {
      title: '登录'
    },
    component: () => import('@pages/login/index.vue')
  },
  {
    path: '/403',
    name: '403',
    meta: {
      title: '403'
    },
    component: () => import('@pages/error/403.vue')
  },
  {
    path: '/404',
    name: '404',
    meta: {
      title: '404'
    },
    component: () => import('@pages/error/404.vue')
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

export const routes: RouteRecordRaw[] = [
  {
    path: '/',
    component: Layouts,
    children: menuRoutes
  },
  ...commonRoutes
]

export function getRoutes() {
  return filterRoutes(routes)
}

function filterRoutes(arr: RouteRecordRaw[]): RouteRecordRaw[] {
  const res: RouteRecordRaw[] = []
  arr.forEach((t) => {
    if (!t.meta?.link) {
      if (t.children && t.children.length) {
        t.children = filterRoutes(t.children)
      }

      res.push(t)
    }
  })
  return res
}
