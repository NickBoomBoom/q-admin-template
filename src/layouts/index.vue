<template>
  <layout-base v-if="systemConfig.layout === 'base'" />
  <layout-top v-else-if="systemConfig.layout === 'top'" />
</template>

<script setup lang="ts">
const LayoutBase = defineAsyncComponent(() => import('./layout-base/index.vue'))
const LayoutTop = defineAsyncComponent(() => import('./layout-top/index.vue'))

const globalStore = useGlobalStore()
const { systemConfig } = storeToRefs(globalStore)
</script>
