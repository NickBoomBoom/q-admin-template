import type {
  RouteLocationNormalized,
  RouteLocationNormalizedGeneric,
  RouteParamsRaw,
  RouteRecordRaw
} from 'vue-router'
import { menuRoutes } from '@/router/routes'
import router from '@/router'
import { storage } from 'utils94'
import { SYSTEM_CONFIG } from '@config/base'
import type { Ref, ComputedRef } from 'vue'

interface GlobalState {
  systemConfig: Ref<SystemConfig>
  user: Ref<User>
  login: (body: any) => Promise<any>
  loginByToken: (to: RouteLocationNormalizedGeneric, token?: string) => Promise<any>
  logout: () => Promise<void>
  isLogin: ComputedRef<boolean>
  isTokenInSession: ComputedRef<boolean>
  menus: Ref<RouteRecordRaw[]>
  isCollapse: Ref<boolean>
  toggleCollapse: (bol?: boolean) => void
  initMenus: () => void
  checkPermission: (to: { path: string }) => boolean
  getBreadcrumb: (routeName: string) => RouteRecordRaw[]
  tabs: Ref<TAB_ITEM[]>
  handleTab: (
    type: 'push' | 'delete',
    route: RouteLocationNormalized | TAB_ITEM,
    fromRoute?: RouteLocationNormalized | TAB_ITEM
  ) => void
}

const TOKEN_KEY = import.meta.env.VITE_TOKEN_KEY
const TAB_KEY = import.meta.env.VITE_TAB_KEY
const localToken = storage.LocalStorage.get(TOKEN_KEY)
export const useGlobalStore = defineStore<'global', GlobalState>('global', () => {
  const systemConfig = ref<SystemConfig>(SYSTEM_CONFIG)
  // user
  const user = ref<User>({
    id: 0,
    token: '',
    username: '',
    nickname: '',
    isAdmin: false,
    permissions: {}
  })

  const isLogin = computed((): boolean => {
    return !!user.value.token
  })

  const isTokenInSession = computed((): boolean => {
    return !!localToken
  })

  async function login(body: any) {
    // TODO: login 接口
    setUser({
      id: 0,
      token: 'test',
      username: '用户名称',
      nickname: '昵称',
      isAdmin: true,
      permissions: {}
    })
    initMenus()
    return getVisitRoute()
  }

  async function loginByToken(
    to: RouteLocationNormalizedGeneric,
    token: string = localToken
  ): Promise<any> {
    // TODO: localToken 去登录
    setUser({
      id: 0,
      token: 'test',
      username: '用户名称',
      nickname: '昵称',
      isAdmin: true,
      permissions: {}
    })
    initMenus()
    return getVisitRoute(to)
  }

  function setUser(obj: any = {}) {
    const { isAdmin } = obj
    const permissionLength = Object.keys(obj.permissions).length
    if (!permissionLength && !isAdmin) {
      ElNotification({
        title: '当前用户无权限',
        message: '请联系管理员!',
        type: 'error'
      })
      throw new Error('当前用户无任何权限')
    }
    user.value = {
      ...user.value,
      ...obj
    }
    storage.LocalStorage.set(TOKEN_KEY, obj.token || 'test')
  }

  async function logout() {
    storage.LocalStorage.remove(TOKEN_KEY)
    clearTab()
    router.replace({
      name: 'Login'
    })
  }

  function getVisitRoute(to?: RouteLocationNormalizedGeneric): any {
    if (to && to.path !== '/') {
      return {
        name: to.name as string,
        params: to.params,
        query: to.query
      }
    } else {
      return getFirstVisitRoute()
    }
  }

  function getFirstVisitRoute() {
    const firstRoute: RouteRecordRaw | undefined = menus.value.find((t) => !t.children?.length)
    const firstChildRoute: RouteRecordRaw | undefined = menus.value.find(
      (t) => !!t.children?.length
    )
    if (firstRoute || firstChildRoute) {
      return {
        name: firstRoute ? firstRoute.name : (firstChildRoute?.children?.[0]?.name as string)
      }
    } else {
      throw new Error('未配置路由')
    }
  }
  // menu
  const menus = ref<RouteRecordRaw[]>([])
  const isCollapse = ref(false)
  function toggleCollapse(bol?: boolean) {
    isCollapse.value = typeof bol === 'boolean' ? bol : !isCollapse.value
  }

  function initMenus() {
    if (user.value.isAdmin) {
      menus.value = menuRoutes
    } else {
      menus.value = filterRoutes(menuRoutes)
    }
  }

  function filterRoutes(routes: RouteRecordRaw[]): RouteRecordRaw[] {
    const res: RouteRecordRaw[] = []
    routes.forEach((t) => {
      const { children, path } = t
      const isPass =
        checkPermission({
          path: `/${path}`
        }) || isUrl(path)
      if (isPass) {
        res.push(t)
      } else if (children?.length) {
        const obj = {
          ...t,
          children: filterRoutes(children)
        }
        res.push(obj)
      }
    })
    return res
  }

  function checkPermission(to: { path: string }): boolean {
    if (user.value.isAdmin) {
      return true
    } else {
      const { path } = to
      return !!user.value.permissions[path]
    }
  }

  function getBreadcrumb(routeName: string): RouteRecordRaw[] {
    const target = menus.value.find((t) => t.name === routeName)
    if (target) {
      return [target]
    } else {
      function _find(arr: any[]): RouteRecordRaw[] {
        let _res = []
        let _done = false
        for (let i = 0; i < arr.length; i++) {
          const item = arr[i]
          const { children } = item
          if (_done) {
            break
          }
          if (children?.length) {
            const target = children.find((t: RouteParamsRaw) => t.name === routeName)
            if (target) {
              _done = true
              _res.push(item, target)
            } else {
              _res.push(item, ..._find(children))
            }
          } else {
            continue
          }
        }
        return _res
      }

      return _find(menus.value)
    }
  }

  // tab
  const tabs = ref<TAB_ITEM[]>(storage.SessionStorage.get(TAB_KEY) || [])
  const preTabIndex = ref<number>(0)

  function handleTab(
    type: 'push' | 'delete',
    route: RouteLocationNormalized | TAB_ITEM,
    fromRoute?: RouteLocationNormalized | TAB_ITEM
  ) {
    // 去除循环引用的字段
    const { matched, redirectedFrom, ..._route } = route
    switch (type) {
      case 'push':
        const index = tabs.value.findIndex((t) => t.fullPath === route.fullPath)
        if (index < 0) {
          tabs.value.push(route)
        } else {
          preTabIndex.value = tabs.value.findIndex((t) => t.fullPath === fromRoute?.fullPath)
        }
        break
      case 'delete':
        if (tabs.value.length === 1) {
          return console.warn('已经是最后一个 tab 了,禁止关闭')
        }
        const i = tabs.value.findIndex((t) => t.fullPath === route.fullPath)
        if (i >= 0) {
          tabs.value.splice(i, 1)
        }
        const nextTag =
          tabs.value[preTabIndex.value] ||
          tabs.value[preTabIndex.value - 1] ||
          tabs.value[i - 1] ||
          tabs.value[tabs.value.length - 1]
        const currentRouteFullPath = router.currentRoute.value.fullPath
        const isCurrentRouteExist = tabs.value.some((t) => t.fullPath === currentRouteFullPath)
        globalService.$closeTag.next(route.fullPath)
        if (isCurrentRouteExist) {
        } else {
          router.push({
            name: nextTag.name as string,
            params: nextTag.params,
            query: nextTag.query
          })
        }

        break
    }
    storage.SessionStorage.set(TAB_KEY, tabs.value)
  }

  function clearTab() {
    tabs.value = []
    storage.SessionStorage.remove(TAB_KEY)
    globalService.$closeAllTag.next()
  }
  return {
    // systemConfig
    systemConfig,
    // user
    user,
    login,
    loginByToken,
    logout,
    isLogin,
    isTokenInSession,
    //  menus
    menus,
    isCollapse,
    toggleCollapse,
    initMenus,
    checkPermission,
    getBreadcrumb,
    // tabs
    tabs,
    handleTab
  }
})
