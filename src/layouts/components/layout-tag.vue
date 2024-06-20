<template>
  <el-scrollbar>
    <div class="flex">
      <div
        v-for="item in tags"
        :key="item.fullPath"
        class="flex items-center justify-center border rounded px-2 cursor-pointer"
        :class="[isCurrent(item) ? 'bg-blue-200' : '']"
      >
        <span>
          {{ item.meta.title }}
        </span>
        <template v-if="isCurrent(item)">
          <span class="i-mdi-reload ml-1" @click="handleRefreshTag(item)"></span>
        </template>
        <span v-if="!isOnlyOne" class="i-mdi-close" @click="handleDeleteTag(item)"></span>
      </div>
    </div>
  </el-scrollbar>
</template>

<script lang="ts" setup>
import type { RouteLocationNormalized } from 'vue-router'

const route = useRoute()
const tagStore = useTagStore()
const { tags } = storeToRefs(tagStore)

const isOnlyOne = computed(() => {
  return tags.value.length === 1
})

function isCurrent(item: RouteLocationNormalized) {
  return item.fullPath === route.fullPath
}

function handleDeleteTag(r: RouteLocationNormalized) {
  tagStore.handleTag('delete', r)
}

function handleRefreshTag(r: RouteLocationNormalized) {}
</script>
