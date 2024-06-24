import type { User } from "types/user"
import type { RouteLocationNormalized, RouteRecordRaw } from 'vue-router'
import { menuRoutes } from '@/router/routes'
import router from '@/router'
import { storage } from 'utils94'

const TOKEN_KEY = import.meta.env.VITE_TOKEN_KEY
const localToken = storage.LocalStorage.get(TOKEN_KEY)
export const useGlobalStore = defineStore('global', () => {

  // user
  const user = ref<User>({
    id: 0,
    token: "",
    username: "用户名称",
    nickname: "昵称",
    isAdmin: false,
    permissions: {
      '/page1': {},
      "dashboard": {}
    }
  })
  const isLogin = computed((): boolean => {
    return !!user.value.token
  })

  const isTokenInSession = computed((): boolean => {
    return !!localToken
  })

  async function login(params: any) {
    storage.LocalStorage.set(TOKEN_KEY, 'test')
    user.value = {
      ...user.value,
      token: 'test'
    }
    initMenus()
    replaceToFirstRoute()
  }



  async function logout() {
    storage.LocalStorage.remove(TOKEN_KEY)
    router.replace({
      name: "Login"
    })
  }

  async function loginByToken(token: string = localToken) {
    // localToken 去登录
    storage.LocalStorage.set(TOKEN_KEY, 'test')
    user.value = {
      ...user.value,
      token: 'test'
    }

  }

  // menu
  const menus = ref<RouteRecordRaw[]>([])
  const isCollapse = ref(false)
  function toggleCollapse() {
    isCollapse.value = !isCollapse.value
  }

  function initMenus() {
    if (user.value.isAdmin) {
      menus.value = menuRoutes
    } else {
      user.value.permissions.value = Object.keys(user.value.permissions).map(t => {
        return t.replace(/^(\/)/, '')
      })
      menus.value = checkPermission(menuRoutes, user.value.permissions.value);
    }
  }

  function checkPermission(routes: RouteRecordRaw[], permissions: string[]): RouteRecordRaw[] {
    const res: RouteRecordRaw[] = []
    routes.forEach(t => {
      const { children, path } = t
      if (permissions.includes(path) || isUrl(path)) {
        res.push(t)
      } else if (children?.length) {
        const obj = {
          ...t,
          children: checkPermission(children, permissions)
        }
        res.push(obj)
      }
    })
    return res
  }

  function checkPermissionByRoute(route: RouteRecordRaw) {

  }

  function replaceToFirstRoute() {
    const target: RouteRecordRaw | undefined = menus.value.find(t => !t.children?.length)
    if (target) {
      router.replace({
        name: target.name as string
      })
    } else {
      const res: RouteRecordRaw | undefined = menus.value.find(t => !!t.children?.length)
      if (res) {
        router.replace({
          name: res.children[0].name as string
        })
      } else {
        throw new Error('未配置路由')
      }


    }
  }
  // tag 
  const tags = ref<RouteLocationNormalized[]>([])

  function handleTag(type: 'push' | 'delete', route: RouteLocationNormalized) {
    switch (type) {
      case 'push':
        const isExist = tags.value.some(t => t.fullPath === route.fullPath)
        !isExist && tags.value.push(route)
        break;
      case 'delete':
        if (tags.value.length === 1) {
          return
        }
        const i = tags.value.findIndex(t => t.name === route.name)
        const nextTag = tags.value[i - 1] || tags.value[tags.value.length - 1]
        if (i >= 0) {
          tags.value.splice(i, 1)
        }
        router.push({
          name: nextTag.name as string,
          params: nextTag.params,
          query: nextTag.query
        })
        break;
    }
  }
  return {
    // user
    user, login, loginByToken, logout, isLogin, isTokenInSession,
    //  menus
    menus, isCollapse, toggleCollapse, initMenus,
    // tags
    tags, handleTag
  }
})
