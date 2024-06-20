import type { RouteLocationNormalized } from 'vue-router'
export const useTagStore = defineStore('tag', () => {

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
        if (i >= 0) {
          tags.value.splice(i, 1)
        }
        break;
    }
  }
  return { tags, handleTag }
})
