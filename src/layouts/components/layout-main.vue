<template>
  <el-scrollbar ref="pageScrollRef" @scroll="handleScroll">
    <RouterView v-slot="{ Component, route }">
      <KeepAlive ref="keepAliveRef">
        <component v-if="!route.meta.noCache" :is="Component" :key="route.fullPath" />
      </KeepAlive>
      <component v-if="route.meta.noCache" :is="Component" :key="route.fullPath" />
    </RouterView>
  </el-scrollbar>
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
