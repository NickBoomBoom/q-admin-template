<template>
  <div class="text-center">
    <div>logo</div>
    <div v-if="!isCollapse" class="text-xl">系统名称</div>
  </div>
</template>
<script setup lang="ts">
const menuStore = useMenuStore()
const { isCollapse } = storeToRefs(menuStore)
</script>
<style lang="scss" scoped></style>
