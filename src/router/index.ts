import { createRouter, createWebHistory } from 'vue-router'
import { getRoutes } from './routes'


const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: getRoutes()
})

export default router
