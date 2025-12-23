import type { RouteRecordRaw, RouteLocationNormalizedGeneric } from 'vue-router';

export type UserStore = {
  user: Ref<User>;
  isLogin: ComputedRef<boolean>;
  isTokenInSession: ComputedRef<boolean>;
  login: (_body: unknown) => Promise<unknown>;
  loginByToken: (
    to: RouteLocationNormalizedGeneric,
    _token?: string
  ) => Promise<unknown>;
  logout: () => Promise<void>;
  setUser: (obj: Partial<User>) => void;
};

export type MenuStore = {
  menus: Ref<RouteRecordRaw[]>;
  isCollapse: Ref<boolean>;
  toggleCollapse: (bol?: boolean) => void;
  initMenus: () => void;
  checkPermission: (to: { path: string }) => boolean;
  getBreadcrumb: (routeName: string) => RouteRecordRaw[];
  getVisitRoute: (to?: RouteLocationNormalizedGeneric) => unknown;
};

export type TabStore = {
  tabs: Ref<TAB_ITEM[]>;
  addTab: (route: import('vue-router').RouteLocationNormalized | TAB_ITEM) => void;
  removeTab: (
    route: import('vue-router').RouteLocationNormalized | TAB_ITEM
  ) => boolean;
  clearTabs: () => void;
};

export type ConfigStore = {
  systemConfig: Ref<SystemConfig>;
};
