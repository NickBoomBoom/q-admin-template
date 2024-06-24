<template>
  <el-page-header @back="globalStore.toggleCollapse" class="py-4">
    <template #icon>
      <div :class="menuIcon"></div>
    </template>

    <template #title>
      <span></span>
    </template>

    <template #content>
      <div class="text-sm">这里可以看通知</div>
    </template>

    <template #extra>
      <layout-user></layout-user>
    </template>
  </el-page-header>
</template>
<script setup lang="ts">
const route = useRoute()
const globalStore = useGlobalStore()
const { isCollapse } = storeToRefs(globalStore)
const menuIcon = computed(() => {
  return isCollapse.value ? 'i-mdi-arrow-collapse-right' : 'i-mdi-arrow-collapse-left'
})
</script>
