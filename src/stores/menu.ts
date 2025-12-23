import type { RouteRecordRaw } from 'vue-router';
import { menuRoutes } from '@/router/routes';
import { isUrl } from '@/utils/verification';

export const useMenuStore = defineStore('menu', () => {
  const menus = ref<RouteRecordRaw[]>([]);
  const isCollapse = ref(false);

  function toggleCollapse(bol?: boolean) {
    isCollapse.value = typeof bol === 'boolean' ? bol : !isCollapse.value;
  }

  function initMenus() {
    const userStore = useUserStore();
    const { user } = storeToRefs(userStore);

    // 避免重复初始化
    if (menus.value.length > 0) {
      return;
    }

    if (user.value.isAdmin) {
      menus.value = [...menuRoutes];
    } else {
      menus.value = filterRoutes(menuRoutes);
    }
  }

  function filterRoutes(
    routes: RouteRecordRaw[],
    prePath: string = '',
    userStore?: ReturnType<typeof useUserStore>,
  ): RouteRecordRaw[] {
    const _userStore = userStore || useUserStore();

    const res: RouteRecordRaw[] = [];
    routes.forEach((t) => {
      const { children, path } = t;
      const curPath = `${prePath}/${path}`;

      // 如果是URL链接，直接通过
      if (isUrl(path)) {
        res.push(t);
        return;
      }

      // 检查权限
      const hasPermission = _checkPermission(curPath, _userStore);

      if (hasPermission) {
        if (children?.length) {
          const _child = filterRoutes(children, curPath, _userStore);
          const obj = {
            ...t,
            children: _child,
          };
          res.push(obj);
        } else {
          res.push(t);
        }
      } else if (children?.length) {
        // 如果父路由没有权限，但子路由有权限，仍然保留父路由结构
        const _child = filterRoutes(children, curPath, _userStore);
        if (_child.length) {
          const obj = {
            ...t,
            children: _child,
          };
          res.push(obj);
        }
      }
    });
    return res;
  }

  function _checkPermission(
    path: string,
    userStore?: ReturnType<typeof useUserStore>,
  ): boolean {
    const _userStore = userStore || useUserStore();
    const { user } = storeToRefs(_userStore);

    if (user.value.isAdmin) {
      return true;
    }
    return !!user.value.permissions[path];
  }

  function checkPermission(to: { path: string }): boolean {
    return _checkPermission(to.path);
  }

  function getBreadcrumb(routeName: string): RouteRecordRaw[] {
    const target = menus.value.find((t) => t.name === routeName);
    if (target) {
      return [target];
    }
    return _findBreadcrumb(menus.value, routeName);
  }

  function _findBreadcrumb(arr: RouteRecordRaw[], routeName: string): RouteRecordRaw[] {
    for (const item of arr) {
      const { children } = item;
      if (children?.length) {
        const target = children.find((t: RouteRecordRaw) => t.name === routeName);
        if (target) {
          return [item, target];
        }
        const result = _findBreadcrumb(children as RouteRecordRaw[], routeName);
        if (result.length > 0) {
          return [item, ...result];
        }
      }
    }
    return [];
  }

  function getVisitRoute(to?: import('vue-router').RouteLocationNormalizedGeneric): unknown {
    if (to && to.path !== '/') {
      return {
        name: to.name as string,
        params: to.params,
        query: to.query,
      };
    }
    return getFirstVisitRoute();
  }

  function getFirstVisitRoute() {
    const firstRoute = menus.value.find((t) => !t.children);
    const firstChildRoute = menus.value.find((t) => !!t.children?.length);

    if (firstRoute) {
      return { name: firstRoute.name };
    }
    if (firstChildRoute?.children?.[0]) {
      return { name: firstChildRoute.children[0].name };
    }
    throw new Error('未配置路由');
  }

  return {
    menus,
    isCollapse,
    toggleCollapse,
    initMenus,
    checkPermission,
    getBreadcrumb,
    getVisitRoute,
  };
});
