<template>
  <template v-for="item in menuList" :key="item.path">
    <el-sub-menu v-if="item.children" :index="item.name || item.path">
      <template #title>
        <el-icon>
          <div :class="item.meta?.icon" class="text-2xl"></div>
        </el-icon>

        <span>{{ item.meta?.title }}</span>
      </template>
      <MenuList v-model:menuList="item.children" />
    </el-sub-menu>

    <el-menu-item v-else :index="item.name || item.path">
      <el-icon>
        <div :class="item.meta?.icon" class="text-2xl"></div>
      </el-icon>
      <template #title>
        <span>{{ item.meta?.title }}</span>
      </template>
    </el-menu-item>
  </template>
</template>

<script setup lang="ts">
const props = defineProps<{
  menuList: any[]
}>()

// 创建一个只有在需要时才会加载的异步组件。
// 引入自身组件，来做递归组件生成无限菜单
const MenuList = defineAsyncComponent({
  loader: () => import('@layouts/components/menu-list.vue')
})
</script>
