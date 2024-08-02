import type { RouteRecordRaw } from 'vue-router'

export default [{
  path: "table",
  name: "Table",
  meta: {
    title: 'Table',
    icon: "i-material-symbols-table-chart-view"
  },
  component: () => import('../../pages/table/index.vue')
}] as RouteRecordRaw[]
