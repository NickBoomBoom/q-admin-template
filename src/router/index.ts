import { createRouter, createWebHistory } from 'vue-router'
import LayoutBase from '@layouts/layout-base/index.vue'
const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: LayoutBase,
      children: [
        {
          path: "login",
          name: "Login",
          component: () => import('../pages/login/index.vue')
        },
      ]
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
})

export default router
