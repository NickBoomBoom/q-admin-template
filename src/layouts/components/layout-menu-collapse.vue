<template>
  <div class="layout-menu-collapse flex items-center justify-center cursor-pointer">
    <el-icon
      size="26"
      class="collapse"
      :class="{
        rotate: isCollapse
      }"
      @click="globalStore.toggleCollapse"
    >
      <div class="i-material-symbols-format-indent-decrease-rounded"></div>
    </el-icon>
  </div>
</template>
<script setup lang="ts">
const globalStore = useGlobalStore()
const { isCollapse } = storeToRefs(globalStore)
</script>
<style lang="scss">
.layout-menu-collapse {
  .collapse {
    transition: all 0.3s;
    &.rotate {
      transform: scaleX(-1);
    }
  }
}
</style>
