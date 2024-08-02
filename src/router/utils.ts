import type { RouteLocationNormalized } from 'vue-router'
import { WHITE_LIST } from './routes'

export function isWhiteList(name: string, path: string) {
  return WHITE_LIST.includes(name) || WHITE_LIST.includes(path)
}

export function setWindowTitle(to?: RouteLocationNormalized) {
  const globalStore = useGlobalStore()
  const sysTitle = globalStore.systemConfig.title
  let windowTitle = globalStore.systemConfig.title
  if (to) {
    const { meta: { title } } = to
    windowTitle = title ? `${title} | ${sysTitle}` : sysTitle
  }
  document.title = windowTitle

}