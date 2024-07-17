<template>
  <el-container class="h-screen layout-base">
    <el-aside class="b-r-1 !w-auto !overflow-unset flex flex-col layout-base-aside">
      <layout-logo />
      <layout-menus class="flex-1" />
    </el-aside>
    <el-container class="overflow-hidden">
      <el-header height="100px" class="overflow-hidden">
        <layout-header />
        <layout-tag />
      </el-header>
      <el-main>
        <RouterView v-if="isRefresh" v-slot="{ Component, route }">
          <KeepAlive ref="keepAliveRef">
            <component v-if="!route.meta.noCache" :is="Component" :key="route.fullPath" />
          </KeepAlive>
          <component v-if="route.meta.noCache" :is="Component" />
        </RouterView>
      </el-main>
      <el-footer>
        <layout-footer />
      </el-footer>
    </el-container>
  </el-container>
</template>
<script setup lang="ts">
import NProgress from 'nprogress'
import type { Subscription } from 'rxjs'
const keepAliveRef = ref()
const route = useRoute()
const isRefresh = ref(true)
const subscribeMap: Subscription[] = []

function initSubscribe() {
  subscribeMap.push(
    busService.$refresh.subscribe({
      next: () => {
        refresh()
      }
    }),
    busService.$closeTag.subscribe({
      next: (path) => {
        removeCache(path)
      }
    }),
    busService.$closeAllTag.subscribe({
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
  NProgress.start()
  removeCache(path)
  isRefresh.value = false
  nextTick(() => {
    isRefresh.value = true
    NProgress.done()
  })
}

function removeAllCache() {
  keepAliveRef.value?.$?.__v_cache?.clear()
}

function removeCache(path: string) {
  keepAliveRef.value?.$?.__v_cache?.delete(path)
}

onMounted(initSubscribe)
onUnmounted(unSubscribe)
</script>
<style lang="scss">
.layout-base {
  &-aside {
    box-shadow: 2px 0 6px #00152959;

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
          background-color: var(--el-color-primary);
        }
      }
    }
  }
}
</style>
