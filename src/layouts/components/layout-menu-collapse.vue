<template>
  <el-button class="layout-menu-collapse flex items-center justify-center cursor-pointer" link>
    <el-icon
      size="26"
      class="collapse"
      :class="{
        rotate: isCollapse
      }"
      @click="menuStore.toggleCollapse"
    >
      <div class="i-material-symbols-format-indent-decrease-rounded"></div>
    </el-icon>
  </el-button>
</template>
<script setup lang="ts">
const menuStore = useMenuStore()
const { isCollapse } = storeToRefs(menuStore)
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
