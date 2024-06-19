<template>
  <el-scrollbar>
    <el-menu
      class="w-full !border-r-none"
      :collapse="isCollapse"
      :default-active="defaultActive"
      :default-openeds="defaultOpends"
      @open="handleOpen"
      @close="handleClose"
      @select="handleSelect"
    >
      <menu-list v-model:menuList="menus" />
    </el-menu>
  </el-scrollbar>
</template>

<script setup lang="ts">
const route = useRoute()
const router = useRouter()
const menuStore = useMenuStore()
const { menus, isCollapse } = storeToRefs(menuStore)
const defaultActive = ref(route.name)
const defaultOpends = ref([route.name])
function handleSelect(index: string) {
  if (isUrl(index)) {
    window.open(index)
  } else {
    router.push({ name: index })
  }
}
const handleOpen = (key: string, keyPath: string[]) => {
  console.log(key, keyPath)
}
const handleClose = (key: string, keyPath: string[]) => {
  console.log(key, keyPath)
}
</script>
