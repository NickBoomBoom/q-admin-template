<template>
  <el-container class="h-screen layout-base">
    <el-aside class="b-r-1 !w-auto !overflow-unset flex flex-col layout-base-aside">
      <layout-logo />
      <layout-menu class="flex-1" />
    </el-aside>
    <el-container class="overflow-hidden">
      <el-header height="auto" class="!p-0">
        <layout-header class="px-2" />
        <layout-tab />
      </el-header>
      <el-main class="!py-3 !px-2 bg-gray-100">
        <el-scrollbar
          ref="pageScrollRef"
          class="layout-base-scrollbar bg-white py-3 px-4 border-rd"
          @scroll="handleScroll"
        >
          <RouterView v-slot="{ Component, route }">
            <KeepAlive ref="keepAliveRef">
              <component v-if="!route.meta.noCache" :is="Component" :key="route.fullPath" />
            </KeepAlive>
            <component v-if="route.meta.noCache" :is="Component" :key="route.fullPath" />
          </RouterView>
        </el-scrollbar>
      </el-main>
      <el-footer class="!h-unset">
        <layout-footer />
      </el-footer>
      <el-backtop target=".layout-base-scrollbar .el-scrollbar__wrap" :right="50" :bottom="80" />
    </el-container>
  </el-container>
</template>
<script setup lang="ts">
import { throttle } from 'lodash-es'
import type { Subscription } from 'rxjs'

const keepAliveRef = ref()
const route = useRoute()
const router = useRouter()
const subscribeMap: Subscription[] = []
const pageScrollRef = ref()
let preScrollbarScroll: ScrollbarScroll = {
  scrollLeft: 0,
  scrollTop: 0
}
function initSubscribe() {
  subscribeMap.push(
    globalService.$refresh.subscribe({
      next: () => {
        refresh()
      }
    }),
    globalService.$closeTag.subscribe({
      next: (path) => {
        removeCache(path)
      }
    }),
    globalService.$closeAllTag.subscribe({
      next: () => {
        removeAllCache()
      }
    })
  )
}

function unSubscribe() {
  subscribeMap.map((t) => t.unsubscribe())
}

function refresh(path: string = route.fullPath) {
  removeCache(path)
  const to = {
    path: route.path,
    params: route.params,
    query: route.query
  }
  router.replace({ name: 'Refresh' }).then(() => {
    router.replace(to)
  })
}

function removeAllCache() {
  keepAliveRef.value?.$?.__v_cache?.clear()
}

function removeCache(path: string) {
  keepAliveRef.value?.$?.__v_cache?.delete(path)
}

function handleScroll(obj: ScrollbarScroll) {
  throttledScrollHandler(obj)
}

const throttledScrollHandler = throttle((obj) => {
  const { scrollLeft, scrollTop } = obj
  const { scrollLeft: preScrollLeft, scrollTop: preScrollTop } = preScrollbarScroll

  globalService.$pageScroll.next({
    x: scrollLeft - preScrollLeft,
    y: scrollTop - preScrollTop,
    scrollLeft,
    scrollTop,
    refEl: pageScrollRef
  })

  preScrollbarScroll = obj
}, 400)
onMounted(initSubscribe)
onUnmounted(unSubscribe)
</script>
<style lang="scss">
.layout-base {
  &-aside {
    box-shadow: 1px 0 5px rgba(0, 21, 41, 0.1);

    .horizontal-collapse-transition {
      transition: var(--el-transition-duration) width linear;
    }
    .el-sub-menu {
      font-weight: 500;
      ul {
        background-color: #fcfcfc;
      }
    }
    .el-menu-item {
      font-weight: 500;
      &.is-active {
        position: relative;
        background-color: var(--el-menu-hover-bg-color);
        &::after {
          content: '';
          position: absolute;
          top: 0;
          right: 0;
          width: 5px;
          height: 100%;
          border-radius: 0.25rem;
          background-color: var(--el-color-primary);
        }
      }
    }
  }
}
</style>
