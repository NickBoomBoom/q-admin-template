<template>
  <el-container class="h-screen layout-base">
    <el-aside class="b-r-1 !w-auto !overflow-unset flex flex-col layout-base-aside">
      <layout-logo />
      <layout-menu class="flex-1" />
    </el-aside>
    <el-container class="overflow-hidden">
      <el-header height="auto" class="!p-0">
        <layout-base-header class="px-2" />
        <layout-tab />
      </el-header>
      <el-main class="!py-3 !px-2 bg-gray-100">
        <layout-main class="layout-base-main bg-white py-3 px-4 border-rd" />
      </el-main>
      <el-footer class="!h-unset">
        <layout-footer />
      </el-footer>
      <el-backtop target=".layout-base-main .el-scrollbar__wrap" :right="50" :bottom="80" />
    </el-container>
  </el-container>
</template>

<style lang="scss">
.layout-base {
  &-aside {
    box-shadow: 1px 0 5px rgba(0, 21, 41, 0.1);
    .horizontal-collapse-transition {
      transition: var(--el-transition-duration) width linear;
    }
    .el-sub-menu {
      font-weight: 500;
      ul {
        background-color: #fcfcfc;
      }
    }
    .el-menu-item {
      font-weight: 500;
      &.is-active {
        position: relative;
        background-color: var(--el-menu-hover-bg-color);
        &::after {
          content: '';
          position: absolute;
          top: 0;
          right: 0;
          width: 5px;
          height: 100%;
          border-radius: 0.25rem;
          background-color: var(--el-color-primary);
        }
      }
    }
  }
}
</style>
