<template>
  <div
    v-if="systemConfig.footer"
    class="py-1 flex items-center justify-center"
    v-html="systemConfig.footer"
  ></div>
</template>
<script setup lang="ts">
const globalStore = useGlobalStore()
const { systemConfig } = storeToRefs(globalStore)
</script>
