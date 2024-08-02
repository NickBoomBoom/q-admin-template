import type { RouteRecordRaw } from 'vue-router'

export default [{
  path: "panel",
  name: "Panel",
  meta: {
    title: 'Panel',
    icon: "i-material-symbols-space-dashboard-sharp"
  },
  children: [
    {
      path: 'index',
      name: "PanelIndex",
      meta: {
        title: '总面板',
        icon: 'i-material-symbols-cards'
      },
      component: () => import('../../pages/panel/index.vue')
    },
    {
      path: 'one',
      name: "PanelOne",
      meta: {
        title: '面板一',
        icon: 'i-material-symbols-calendar-today'
      },
      component: () => import('../../pages/panel/panel-1/index.vue')
    },
    {
      path: 'two',
      name: "PanelTwo",
      meta: {
        title: '面板二',
        icon: 'i-material-symbols-sentiment-calm-outline-rounded'
      },
      component: () => import('../../pages/panel/panel-2/index.vue')
    },

  ]
}] as RouteRecordRaw[]
