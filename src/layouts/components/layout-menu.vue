<template>
  <el-scrollbar>
    <el-menu
      ref="menuRef"
      id="layout-menu"
      class="!w-full !border-r-none"
      popper-class="layout-menu-popper"
      :collapse="isCollapse"
      :collapse-transition="false"
      :default-active="defaultActive"
      :default-openeds="defaultOpends"
    >
      <menu-list v-model:menuList="menus" />
    </el-menu>
  </el-scrollbar>
</template>

<script setup lang="ts">
const route = useRoute();
const menuStore = useMenuStore();
const { menus, isCollapse } = storeToRefs(menuStore);
const defaultActive = ref<string>(parsePath(route.fullPath));
const defaultOpends = ref<string[]>([parsePath(route.fullPath)]);

function parsePath(s: string) {
  return s.replace(/^\//, "");
}

watch(route, (v) => {
  defaultActive.value = parsePath(v.fullPath);
});
</script>
