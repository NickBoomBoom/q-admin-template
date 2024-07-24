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
      <el-main class="py-0">
        <el-scrollbar>
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
    </el-container>
  </el-container>
</template>
<script setup lang="ts">
import type { Subscription } from 'rxjs'
const keepAliveRef = ref()
const route = useRoute()
const router = useRouter()
const subscribeMap: Subscription[] = []

const globalStore = useGlobalStore()
const { isCollapse } = storeToRefs(globalStore)

const collapseIcon = computed(() => {
  return isCollapse.value ? 'i-mdi-chevron-triple-right' : 'i-mdi-chevron-triple-left'
})

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

onMounted(initSubscribe)
onUnmounted(unSubscribe)
</script>
<style lang="scss">
.layout-base {
  &-aside {
    box-shadow: 1px 0 5px rgba(0, 21, 41, 0.2);

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
