<template>
  <div class="h-12 flex items-center">
    <el-icon :class="menuIcon" @click="menuStore.toggleCollapse"></el-icon>
  </div>
</template>
<script setup lang="ts">
const menuStore = useMenuStore()
const { isCollapse } = storeToRefs(menuStore)
const menuIcon = computed(() => {
  return isCollapse.value ? 'i-mdi-arrow-collapse-right' : 'i-mdi-arrow-collapse-left'
})
const router = useRouter()
console.log(router.getRoutes())
</script>
<style lang="scss" scoped></style>
