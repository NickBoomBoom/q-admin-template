<template>
  <div class="p-4 flex items-center justify-center">
    <img v-if="systemConfig.logo" :src="systemConfig?.logo" alt="logo" width="40" />
    <div
      v-if="!isCollapse && (systemConfig.title || systemConfig.subTitle)"
      class="flex items-start flex-col ml-2 text-sm font-bold"
    >
      <div v-html="systemConfig?.title" />
      <div v-html="systemConfig?.subTitle" />
    </div>
  </div>
</template>
<script setup lang="ts">
const globalStore = useGlobalStore()
const { isCollapse, systemConfig } = storeToRefs(globalStore)
</script>
