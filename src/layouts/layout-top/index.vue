<template>
  <el-container class="layout-top h-screen">
    <el-header class="!p-0 !h-auto">
      <layout-top-header />
    </el-header>
    <el-container class="!overflow-hidden">
      <el-aside class="flex flex-col !w-auto min-w-15">
        <layout-menu class="flex-1" />
        <layout-menu-collapse class="h-10" />
      </el-aside>
      <el-container>
        <el-main class="flex-1 !py-3 !px-2 bg-gray-100">
          <layout-main />
        </el-main>
        <el-footer class="!h-unset">
          <layout-footer />
        </el-footer>
      </el-container>
    </el-container>
  </el-container>
</template>
