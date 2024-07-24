<template>
  <el-scrollbar>
    <el-menu
      ref="menuRef"
      class="!w-full !border-r-none"
      :collapse="isCollapse"
      :collapse-transition="false"
      :default-active="defaultActive"
      :default-openeds="defaultOpends"
      @select="handleSelect"
    >
      <menu-list v-model:menuList="menus" />
    </el-menu>
  </el-scrollbar>
</template>

<script setup lang="ts">
const route = useRoute()
const router = useRouter()
const globalStore = useGlobalStore()
const menuRef = ref()
const { menus, isCollapse } = storeToRefs(globalStore)
const defaultActive = ref<string>(route.name as string)
const defaultOpends = ref<string[]>([route.name as string])

watch(route, (v) => {
  defaultActive.value = v.name as string
})
function handleSelect(index: string) {
  if (isUrl(index)) {
    window.open(index)
  } else {
    router.push({ name: index })
  }
}
</script>
