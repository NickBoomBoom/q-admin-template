import { NavigationFailureType, createRouter, createWebHistory, isNavigationFailure, type NavigationFailure, type RouteLocationNormalized, type RouteLocationNormalizedGeneric, type NavigationGuardNext } from 'vue-router'
import { getRoutes, WHITE_LIST } from './routes'
import NProgress from 'nprogress'


async function setup(to: RouteLocationNormalizedGeneric, from: RouteLocationNormalizedGeneric, next: NavigationGuardNext) {
  const globalStore = useGlobalStore()
  const { name, query: { token } } = to

  // 白名单检测
  if (WHITE_LIST.includes(name as string)) {
    return next()
  }

  // 路由上携带 token
  if (token) {
    await globalStore.loginByToken(token as string)
    globalStore.initMenus()
    return
  }

  // 已登录
  if (globalStore.isLogin) {
    if (globalStore.menus.length === 0) {
      globalStore.initMenus()
    }
  }
  // 跳转登录
  else if (!globalStore.isLogin) {
    // 存在 token,但未登录
    if (globalStore.isTokenInSession) {
      await globalStore.loginByToken()
      globalStore.initMenus()
    } else {
      next({
        name: "Login",
        replace: true
      })

    }
  }

}

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: getRoutes()
})



router.beforeEach(async (to, from, next) => {
  console.log('before', to, from)
  NProgress.start()
  await setup(to, from, next)
  next()
})

router.afterEach((to: RouteLocationNormalized, from: RouteLocationNormalized, failure: void | NavigationFailure) => {
  // console.log('after', to, from, failure)
  const isFail = isNavigationFailure(failure)
  const isRepeat = isNavigationFailure(failure, NavigationFailureType.duplicated)
  const isCancel = isNavigationFailure(failure, NavigationFailureType.aborted | NavigationFailureType.cancelled)
  const globalStore = useGlobalStore()
  const isWhiteList = WHITE_LIST.includes(to.name as string)
  if (isFail || isRepeat || isCancel) {

  }
  // 非白名单入 tag
  else if (!isWhiteList) {
    globalStore.handleTag('push', to, from)
  }

  NProgress.done()
})
export default router
