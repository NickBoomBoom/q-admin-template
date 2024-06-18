<template>
  <el-scrollbar>
    <el-menu
      class="w-full !border-r-none"
      :collapse="isCollapse"
      @open="handleOpen"
      @close="handleClose"
    >
      <!-- <template v-for="item in menus">
      <el-submenu v-if="item.children && item.children.length > 0" :index="item.index">
        <template #title>
          <i class="el-icon-menu"></i>{{ item.title }}
        </template>
        <el-menu-item v-for="child in item.children" :index="child.index" :key="child.index">{{ child.title }}</el-menu-item>
      </el-submenu>
      <el-menu-item v-else :index="item.index">{{ item.title }}</el-menu-item>
    </template>
         -->
      上课上课
    </el-menu>
  </el-scrollbar>
</template>

<script setup lang="ts">
const isCollapse = ref(false)
function toggleCollapse() {
  isCollapse.value = !isCollapse.value
}
const handleOpen = (key: string, keyPath: string[]) => {
  console.log(key, keyPath)
}
const handleClose = (key: string, keyPath: string[]) => {
  console.log(key, keyPath)
}
</script>
