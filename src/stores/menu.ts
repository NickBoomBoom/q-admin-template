import { menuRoutes } from '@/router/routes'
export const useMenuStore = defineStore('menu', () => {

  const menus = ref(menuRoutes)
  const isCollapse = ref(false)

  function toggleCollapse() {
    isCollapse.value = !isCollapse.value
  }

  return { menus, isCollapse, toggleCollapse }
})
