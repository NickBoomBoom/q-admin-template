import type { RouteRecordRaw } from "vue-router";
import Layouts from "@layouts/index.vue";

export const WHITE_LIST = ["Login", "403", "404", "Refresh"];

export const routes: RouteRecordRaw[] = [
  {
    path: "/",
    component: Layouts,
    children: [
      {
        path: "dashboard",
        name: "Dashboard",
        meta: {
          title: "Dashboard",
        },
        component: () => import("@pages/dashboard/index.vue"),
      },
      {
        path: "panel",
        name: "Panel",
        meta: {
          title: "Panel",
        },
        children: [
          {
            path: "index",
            name: "PanelIndex",
            meta: {
              title: "总面板",
            },
            component: () => import("@pages/panel/index.vue"),
          },
          {
            path: "one",
            name: "PanelOne",
            meta: {
              title: "面板一",
            },
            component: () => import("@pages/panel/panel-1/index.vue"),
          },
          {
            path: "two",
            name: "PanelTwo",
            meta: {
              title: "面板二",
            },
            component: () => import("@pages/panel/panel-2/index.vue"),
          },
        ],
      },
      {
        path: "table",
        name: "Table",
        meta: {
          title: "Table",
        },
        component: () => import("@pages/table/index.vue"),
      },
    ],
  },
  {
    path: "/login",
    name: "Login",
    meta: {
      title: "登录",
    },
    component: () => import("@pages/login/index.vue"),
  },
  {
    path: "/403",
    name: "403",
    meta: {
      title: "403",
    },
    component: () => import("@pages/error/403.vue"),
  },
  {
    path: "/404",
    name: "404",
    meta: {
      title: "404",
    },
    component: () => import("@pages/error/404.vue"),
  },
  {
    path: "/refresh",
    name: "Refresh",
    redirect: "/",
  },
  {
    path: "/:pathMatch(.*)*",
    redirect: {
      name: "404",
    },
  },
];
