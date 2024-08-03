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

    <!-- <el-menu-item v-else :index="item.name || item.path"> -->
    <el-menu-item v-if="!item.children && !item.meta.hideInMenus" :index="item.name || item.path">
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

const MenuList = defineAsyncComponent({
  loader: () => import('@layouts/components/menu-list.vue')
})
</script>
