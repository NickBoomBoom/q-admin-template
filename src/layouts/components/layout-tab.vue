<template>
  <el-scrollbar class="layout-tab !h-8">
    <div class="flex px-2 flex-nowrap">
      <div
        v-for="item in tabs"
        :key="item.fullPath"
        class="layout-tab-item h-8 flex shrink-0 items-center text-sm px-2 py-1 !ml-0 cursor-pointer border b-solid b-1 b-elGray"
        :class="[
          isCurrent(item)
            ? 'active bg-primary text-white b-primary'
            : 'hover:bg-primary-200 hover:text-white hover:border-primary-200'
        ]"
        @click.self="handleTap(item)"
      >
        {{ item.query.t || item.meta.title }}
        <template v-if="isCurrent(item)">
          <div class="i-mdi-reload ml-1 text-xl" @click.self="handleRefreshTag(item)"></div>
        </template>

        <div
          v-if="!isOnlyOne"
          class="i-mdi-window-close text-xl"
          @click.self="handleDeleteTag(item)"
        ></div>
      </div>
    </div>
  </el-scrollbar>
</template>

<script lang="ts" setup>
import type { RouteLocationNormalized } from 'vue-router'

const route = useRoute()
const router = useRouter()
const globalStore = useGlobalStore()
const { tabs } = storeToRefs(globalStore)

const isOnlyOne = computed(() => {
  return tabs.value.length === 1
})

function isCurrent(item: RouteLocationNormalized) {
  return item.fullPath === route.fullPath
}

function handleDeleteTag(r: RouteLocationNormalized) {
  globalStore.handleTab('delete', r)
}

function handleRefreshTag(r: RouteLocationNormalized) {
  globalService.$refresh.next()
}

function handleTap(r: RouteLocationNormalized) {
  router.push({
    name: r.name!,
    params: r.params,
    query: r.query
  })
}
</script>

<style scoped lang="scss">
.layout-tab {
  box-shadow: 0px 4px 6px rgba(0, 21, 41, 0.1);

  &-item {
    border-radius: 0.25rem 0.25rem 0 0;
  }
}
</style>
