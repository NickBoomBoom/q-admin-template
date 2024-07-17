<template>
  <el-scrollbar>
    <div class="flex">
      <div
        v-for="item in tags"
        :key="item.fullPath"
        class="flex shrink-0 items-center px-2 py-1 !ml-0 border border-solid border-gray-200 cursor-pointer"
        :class="[
          isCurrent(item)
            ? 'bg-primary text-white border-primary'
            : 'hover:bg-primary-200 hover:text-white hover:border-primary-200'
        ]"
        @click.self="handleTap(item)"
      >
        {{ item.meta.title }}
        <template v-if="isCurrent(item)">
          <div class="i-mdi-reload ml-1" @click.self="handleRefreshTag(item)"></div>
        </template>

        <div v-if="!isOnlyOne" class="i-mdi-close" @click.self="handleDeleteTag(item)"></div>
      </div>
    </div>
  </el-scrollbar>
</template>

<script lang="ts" setup>
import type { RouteLocationNormalized } from 'vue-router'

const route = useRoute()
const router = useRouter()
const globalStore = useGlobalStore()
const { tags } = storeToRefs(globalStore)

const isOnlyOne = computed(() => {
  return tags.value.length === 1
})

function isCurrent(item: RouteLocationNormalized) {
  return item.fullPath === route.fullPath
}

function handleDeleteTag(r: RouteLocationNormalized) {
  globalStore.handleTag('delete', r)
}

function handleRefreshTag(r: RouteLocationNormalized) {
  busService.$refresh.next()
}

function handleTap(r: RouteLocationNormalized) {
  router.push({
    name: r.name!,
    params: r.params,
    query: r.query
  })
}
</script>
