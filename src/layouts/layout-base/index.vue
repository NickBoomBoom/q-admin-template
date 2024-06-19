<template>
  <el-container class="h-screen">
    <el-aside class="b-r-1 b-r-solid b-#e4e7ed !w-auto !overflow-unset flex flex-col">
      <layout-logo />
      <layout-menus class="flex-1" />
    </el-aside>
    <el-container class="overflow-hidden">
      <el-header height="auto">
        <layout-header />
        <layout-tag />
      </el-header>
      <el-main>
        <RouterView />
      </el-main>
      <el-footer>
        <layout-footer />
      </el-footer>
    </el-container>
  </el-container>
</template>
<script setup lang="ts"></script>
<style lang="scss" scoped></style>
