import {
  NavigationFailureType,
  createRouter,
  createWebHistory,
  isNavigationFailure,
  type NavigationFailure,
  type RouteLocationNormalized,
  type RouteLocationNormalizedGeneric,
} from "vue-router";
import { getRoutes } from "./routes";
import NProgress from "nprogress";
import { isWhiteList, setWindowTitle } from "./utils";

const BASE_URL = import.meta.env.BASE_URL;

const router = createRouter({
  history: createWebHistory(BASE_URL),
  routes: getRoutes(),
});

router.beforeEach(async (to, from, next) => {
  console.log("before", to, from);
  NProgress.start();
  setWindowTitle();
  const res = await setup(to, from);
  next(res);
});

router.afterEach(
  (
    to: RouteLocationNormalized,
    from: RouteLocationNormalized,
    failure: void | NavigationFailure
  ) => {
    console.log("after", to, from);
    const isFail = isNavigationFailure(failure);
    const isRepeat = isNavigationFailure(
      failure,
      NavigationFailureType.duplicated
    );
    const isCancel = isNavigationFailure(
      failure,
      NavigationFailureType.aborted | NavigationFailureType.cancelled
    );

    if (isFail || isRepeat || isCancel) {
    } else if (!isWhiteList(to.name as string, to.path) && to.path !== "/") {
      // 非白名单入 tab
      const tabStore = useTabStore();
      tabStore.addTab(to);
    }
    setWindowTitle(to);
    NProgress.done();
  }
);

async function setup(
  to: RouteLocationNormalizedGeneric,
  _from: RouteLocationNormalizedGeneric
): Promise<any> {
  const userStore = useUserStore();
  const menuStore = useMenuStore();
  const {
    name,
    query: { token },
    path,
  } = to;

  // 白名单检测
  if (isWhiteList(name as string, path)) {
    return true;
  }

  // 路由上携带 token,第三方跳转
  if (token) {
    const res = await userStore.loginByToken(to, token as string);
    return res;
  }

  if (userStore.isLogin) {
    if (menuStore.checkPermission(to)) {
      return true;
    }
    return {
      name: "403",
    };
  } else {
    if (userStore.isTokenInSession) {
      const res = await userStore.loginByToken(to);
      return res;
    }
    return {
      name: "Login",
      replace: true,
    };
  }
}

export default router;
