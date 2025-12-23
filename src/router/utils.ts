import type { RouteLocationNormalized } from 'vue-router';
import { WHITE_LIST } from './routes';

export function isWhiteList(name: string, path: string) {
  return WHITE_LIST.includes(name) || WHITE_LIST.includes(path);
}

export function setWindowTitle(to?: RouteLocationNormalized) {
  const configStore = useConfigStore();
  const sysTitle = configStore.systemConfig.title;
  let windowTitle = configStore.systemConfig.title;
  if (to) {
    const {
      meta: { title },
    } = to;
    windowTitle = title ? `${title} | ${sysTitle}` : sysTitle;
  }
  document.title = windowTitle;
}
