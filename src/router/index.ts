import { NavigationFailureType, createRouter, createWebHistory, isNavigationFailure, type NavigationFailure, type RouteLocationNormalized } from 'vue-router'
import { getRoutes } from './routes'


const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: getRoutes()
})



router.beforeEach((to, from, next) => {
  console.log('before', to, from)
  next()
})

router.afterEach((to: RouteLocationNormalized, from: RouteLocationNormalized, failure: void | NavigationFailure) => {
  console.log('after', to, from, failure)
  const isFail = isNavigationFailure(failure)
  const isRepeat = isNavigationFailure(failure, NavigationFailureType.duplicated)
  const isCancel = isNavigationFailure(failure, NavigationFailureType.aborted | NavigationFailureType.cancelled)
  const tagStore = useTagStore()
  if (isFail || isRepeat || isCancel) {

  } else {
    tagStore.handleTag('push', to)
  }
})
export default router
