import {
  NavigationFailureType,
  createRouter,
  createWebHistory,
  isNavigationFailure,
  type NavigationFailure,
  type RouteLocationNormalized,
  type RouteLocationNormalizedGeneric,
  type NavigationGuardNext
} from 'vue-router'
import { getRoutes } from './routes'
import NProgress from 'nprogress'
import { isWhiteList, setWindowTitle } from './utils'
const BASE_URL = import.meta.env.BASE_URL

async function setup(to: RouteLocationNormalizedGeneric, from: RouteLocationNormalizedGeneric) {
  const globalStore = useGlobalStore()
  const {
    name,
    query: { token },
    path
  } = to

  // 白名单检测
  if (isWhiteList(name as string, path)) {
    return true
  }

  // 路由上携带 token,第三方跳转
  if (token) {
    const res = await globalStore.loginByToken(to, token as string)
    return res
  }

  if (globalStore.isLogin) {
    if (globalStore.checkPermission(to)) {
      return true
    } else {
      return {
        name: '403'
      }
    }
  } else {
    if (globalStore.isTokenInSession) {
      const res = await globalStore.loginByToken(to)
      return res
    } else {
      return {
        name: 'Login',
        replace: true
      }
    }
  }
}

const router = createRouter({
  history: createWebHistory(BASE_URL),
  routes: getRoutes()
})

router.beforeEach(async (to, from, next) => {
  // console.log('before', to, from)
  NProgress.start()
  setWindowTitle()
  const res = await setup(to, from)
  next(res)
})

router.afterEach(
  (
    to: RouteLocationNormalized,
    from: RouteLocationNormalized,
    failure: void | NavigationFailure
  ) => {
    // console.log('after', to, from)
    const isFail = isNavigationFailure(failure)
    const isRepeat = isNavigationFailure(failure, NavigationFailureType.duplicated)
    const isCancel = isNavigationFailure(
      failure,
      NavigationFailureType.aborted | NavigationFailureType.cancelled
    )
    const globalStore = useGlobalStore()

    if (isFail || isRepeat || isCancel) {
    }
    // 非白名单入 tab
    else if (!isWhiteList(to.name as string, to.path) && to.path !== '/') {
      globalStore.handleTab('push', to, from)
    }
    setWindowTitle(to)
    NProgress.done()
  }
)
export default router
