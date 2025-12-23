import type { RouteLocationNormalizedGeneric } from 'vue-router';
import { storage } from 'utils94';
import { ElNotification } from 'element-plus';
import type { UserStore } from './types';

const TOKEN_KEY = import.meta.env.VITE_TOKEN_KEY;
const localToken = storage.LocalStorage.get(TOKEN_KEY);

export const useUserStore = defineStore('user', (): UserStore => {
  const user = ref<User>({
    id: 0,
    token: '',
    username: '',
    nickname: '',
    isAdmin: false,
    permissions: {},
  });

  const isLogin = computed((): boolean => {
    return !!user.value.token;
  });

  const isTokenInSession = computed((): boolean => {
    return !!localToken;
  });

  function setUser(obj: Partial<User> = {}) {
    const { isAdmin } = obj;
    const permissionLength = Object.keys(obj.permissions || {}).length;
    if (!permissionLength && !isAdmin) {
      ElNotification({
        title: '当前用户无权限',
        message: '请联系管理员!',
        type: 'error',
      });
      throw new Error('当前用户无任何权限');
    }
    user.value = {
      ...user.value,
      ...obj,
    };
    storage.LocalStorage.set(TOKEN_KEY, obj.token || 'test');
  }

  async function login(_body: unknown) {
    // TODO: login 接口
    setUser({
      id: 0,
      token: 'test',
      username: '用户名称',
      nickname: '昵称',
      isAdmin: true,
      permissions: {},
    });
    const menuStore = useMenuStore();
    menuStore.initMenus();
    return menuStore.getVisitRoute();
  }

  async function loginByToken(
    to: RouteLocationNormalizedGeneric,
    _token: string = localToken,
  ): Promise<unknown> {
    // TODO: localToken 去登录
    setUser({
      id: 0,
      token: 'test',
      username: '用户名称',
      nickname: '昵称',
      isAdmin: true,
      permissions: {},
    });
    const menuStore = useMenuStore();
    menuStore.initMenus();
    return menuStore.getVisitRoute(to);
  }

  async function logout() {
    storage.LocalStorage.remove(TOKEN_KEY);
    const tabStore = useTabStore();
    tabStore.clearTabs();
    const router = (await import('@/router')).default;
    router.replace({
      name: 'Login',
    });
  }

  return {
    user,
    isLogin,
    isTokenInSession,
    login,
    loginByToken,
    logout,
    setUser,
  };
});
