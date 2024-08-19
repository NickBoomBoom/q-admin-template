<template>
  <el-scrollbar>
    <el-menu
      ref="menuRef"
      id="layout-menu"
      class="!w-full !border-r-none"
      :collapse="isCollapse"
      :collapse-transition="false"
      :default-active="defaultActive"
      :default-openeds="defaultOpends"
    >
      <menu-list v-model:menuList="menus" />
    </el-menu>
  </el-scrollbar>
</template>

<script setup lang="ts">
const route = useRoute()
const globalStore = useGlobalStore()
const menuRef = ref()
const { menus, isCollapse } = storeToRefs(globalStore)
const defaultActive = ref<string>(parsePath(route.fullPath))
const defaultOpends = ref<string[]>([parsePath(route.fullPath)])

function parsePath(s: string) {
  return s.replace(/^\//, '')
}
watch(route, (v) => {
  defaultActive.value = parsePath(v.fullPath)
})
 
</script>
