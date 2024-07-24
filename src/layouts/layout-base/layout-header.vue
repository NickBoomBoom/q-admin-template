<template>
  <div class="layout-header flex items-center pt-4 pb-2">
    <div>
      <el-icon
        size="26"
        class="cursor-pointer collapse"
        :class="{
          rotate: isCollapse
        }"
        @click="globalStore.toggleCollapse"
      >
        <div class="i-mdi-format-indent-decrease"></div>
      </el-icon>
    </div>
    <div class="flex-1"></div>
    <layout-user></layout-user>
  </div>
</template>
<script setup lang="ts">
const globalStore = useGlobalStore()
const { isCollapse } = storeToRefs(globalStore)
</script>
<style lang="scss">
.layout-header {
  .collapse {
    transition: all 0.3s;
    &.rotate {
      transform: scaleX(-1);
    }
  }
}
</style>
