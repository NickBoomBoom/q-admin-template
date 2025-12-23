<template>
  <el-scrollbar ref="pageScrollRef" @scroll="handleScroll">
    <RouterView v-slot="{ Component, route }">
      <KeepAlive ref="keepAliveRef">
        <component
          v-if="!route.meta.noCache"
          :is="Component"
          :key="route.fullPath"
        />
      </KeepAlive>
      <component
        v-if="route.meta.noCache"
        :is="Component"
        :key="route.fullPath"
      />
    </RouterView>
  </el-scrollbar>
</template>
<script setup lang="ts">
import { throttle } from "lodash-es";
import { useMittEvents } from "@/composables/useMittEvents";
import { globalEventBus } from "@/services/global.service";

const keepAliveRef = ref();
const route = useRoute();
const router = useRouter();
const pageScrollRef = ref();
let preScrollbarScroll: ScrollbarScroll = {
  scrollLeft: 0,
  scrollTop: 0,
};

useMittEvents({
  refresh: () => {
    refresh();
  },
  closeTag: (path: string) => {
    removeCache(path);
  },
  closeAllTag: () => {
    removeAllCache();
  },
});

function refresh(path: string = route.fullPath) {
  removeCache(path);
  const to = {
    path: route.path,
    params: route.params,
    query: route.query,
  };
  router.replace({ name: "Refresh" }).then(() => {
    router.replace(to);
  });
}

function removeAllCache() {
  keepAliveRef.value?.$?.__v_cache?.clear();
}

function removeCache(path: string) {
  keepAliveRef.value?.$?.__v_cache?.delete(path);
}

function handleScroll(obj: ScrollbarScroll) {
  throttledScrollHandler(obj);
}

const throttledScrollHandler = throttle((obj) => {
  const { scrollLeft, scrollTop } = obj;
  const { scrollLeft: preScrollLeft, scrollTop: preScrollTop } =
    preScrollbarScroll;

  globalEventBus.emit("pageScroll", {
    x: scrollLeft - preScrollLeft,
    y: scrollTop - preScrollTop,
    scrollLeft,
    scrollTop,
    refEl: pageScrollRef,
  });

  preScrollbarScroll = obj;
}, 400);
</script>
