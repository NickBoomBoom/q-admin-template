<template>
  <div class="layout-breadcrumb flex items-center text-base text-black">
    <template v-for="(item, index) in breadcrumb" :key="item.name">
      <span v-if="index === breadcrumb.length - 1"> {{ item.meta?.title }}</span>
      <el-dropdown v-else-if="item.children?.length" class="h-full">
        <div class="flex items-center text-base text-black">
          {{ item.meta?.title }}
          <i class="i-material-symbols-keyboard-arrow-down-rounded text-2xl" />
        </div>
        <template #dropdown>
          <el-dropdown-menu>
            <el-dropdown-item
              v-for="link in item.children.filter((t) => !t.meta?.hideInMenus)"
              class="text-base"
              @click="handleItem(link)"
            >
              <i :class="link.meta?.icon" />
              {{ link.meta?.title }}
            </el-dropdown-item>
          </el-dropdown-menu>
        </template>
      </el-dropdown>
      <span v-else class="cursor-pointer" @click="handleItem(item)"> {{ item.meta?.title }}</span>
      <span v-if="index !== breadcrumb.length - 1">&nbsp;/&nbsp;</span>
    </template>
  </div>
</template>

<script setup lang="ts">
import type { RouteRecordRaw } from 'vue-router'
const route = useRoute()
const router = useRouter()
const globalStore = useGlobalStore()
const breadcrumb = ref<RouteRecordRaw[]>([])

watch(
  route,
  (v: any) => {
    check()
  },
  {
    immediate: true
  }
)

function check() {
  breadcrumb.value = globalStore.getBreadcrumb(route.name)
}

function handleItem(item: RouteRecordRaw) {
  router.push({
    name: item.name
  })
}
</script>
