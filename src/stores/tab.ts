import type { RouteLocationNormalized } from "vue-router";
import { storage } from "utils94";
import router from "@/router";
import { globalEventBus } from "@/services/global.service";
import type { TabStore } from "./types";

const TAB_KEY = import.meta.env.VITE_TAB_KEY;

export const useTabStore = defineStore("tab", (): TabStore => {
  const tabs = ref<TAB_ITEM[]>(storage.SessionStorage.get(TAB_KEY) || []);

  /**
   * 添加标签页（如果不存在）
   */
  function addTab(route: RouteLocationNormalized | TAB_ITEM) {
    const exists = tabs.value.some((t) => t.fullPath === route.fullPath);
    if (!exists) {
      tabs.value.push(route);
    }
    saveTabs();
  }

  /**
   * 移除指定标签页
   * @param route 要移除的路由
   * @returns 是否成功移除
   */
  function removeTab(route: RouteLocationNormalized | TAB_ITEM): boolean {
    // 保护最后一个标签页
    if (tabs.value.length === 1) {
      console.warn("已经是最后一个 tab 了,禁止关闭");
      return false;
    }

    const index = tabs.value.findIndex((t) => t.fullPath === route.fullPath);
    if (index < 0) {
      return false;
    }

    // 移除标签页
    tabs.value.splice(index, 1);

    // 通知其他组件
    globalEventBus.emit("closeAllTag", route.fullPath);

    // 导航到下一个标签页
    navigateAfterRemove(index, route.fullPath);

    saveTabs();
    return true;
  }

  /**
   * 移除标签页后导航到合适的页面
   */
  function navigateAfterRemove(removedIndex: number, removedFullPath: string) {
    const currentRouteFullPath = router.currentRoute.value.fullPath;

    // 如果当前路由就是要删除的路由，或者当前路由不在 tabs 中，需要导航
    const shouldNavigate =
      currentRouteFullPath === removedFullPath ||
      !tabs.value.some((t) => t.fullPath === currentRouteFullPath);

    if (!shouldNavigate) {
      return;
    }

    // 选择下一个标签页：
    // 1. 优先选择被删除标签页的前一个
    // 2. 其次选择被删除标签页位置的后一个（即原来的 index 位置）
    // 3. 最后选择最后一个
    const nextTag =
      tabs.value[removedIndex - 1] || // 前一个
      tabs.value[removedIndex] || // 当前位置（原来的后一个）
      tabs.value[tabs.value.length - 1]; // 最后一个

    if (nextTag) {
      router.push({
        name: nextTag.name as string,
        params: nextTag.params,
        query: nextTag.query,
      });
    }
  }

  /**
   * 保存标签页到 sessionStorage
   */
  function saveTabs() {
    storage.SessionStorage.set(TAB_KEY, tabs.value);
  }

  /**
   * 清空所有标签页
   */
  function clearTabs() {
    tabs.value = [];
    storage.SessionStorage.remove(TAB_KEY);
    globalEventBus.emit("closeAllTag");
  }

  return {
    tabs,
    addTab,
    removeTab,
    clearTabs,
  };
});
