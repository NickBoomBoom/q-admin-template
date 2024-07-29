<template>
  <div class="layout-top-header bg-primary flex items-center px-5 h-14">
    <div class="flex items-center">
      <img v-if="systemConfig.logo" :src="systemConfig?.logo" alt="logo" width="40" />
      <div
        v-if="systemConfig.title || systemConfig.subTitle"
        class="flex items-start flex-col ml-2 text-sm font-bold text-white"
      >
        <div v-html="systemConfig?.title" />
        <div v-html="systemConfig?.subTitle" />
      </div>
    </div>
    <div class="flex-1"></div>
    <layout-user color="white"></layout-user>
  </div>
</template>
<script setup lang="ts">
const globalStore = useGlobalStore()
const { isCollapse, systemConfig } = storeToRefs(globalStore)
</script>
