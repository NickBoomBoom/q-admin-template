<template>
  <div class="layout-breadcrumb flex items-center text-base text-black">
    <template v-for="(item, index) in breadcrumb" :key="item.name">
      <span v-if="index === breadcrumb.length - 1"> {{ item.meta.title }}</span>
      <el-dropdown v-else-if="item.children?.length" class="h-full">
        <div class="flex items-center text-base text-black">
          {{ item.meta.title }}
          <i class="i-material-symbols-keyboard-arrow-down-rounded text-2xl" />
        </div>
        <template #dropdown>
          <el-dropdown-menu>
            <el-dropdown-item
              v-for="link in item.children"
              class="text-base"
              @click="handleItem(link)"
            >
              <i :class="link.meta.icon" />
              {{ link.meta.title }}
            </el-dropdown-item>
          </el-dropdown-menu>
        </template>
      </el-dropdown>
      <span v-else class="cursor-pointer" @click="handleItem(item)">
        {{ item.meta.title }}</span
      >
      <span v-if="index !== breadcrumb.length - 1">&nbsp;/&nbsp;</span>
    </template>
  </div>
</template>

<script setup lang="ts">
import type { MenuItem } from "@/config/menus";
const route = useRoute();
const router = useRouter();
const menuStore = useMenuStore();
const breadcrumb = ref<MenuItem[]>([]);

watch(
  route,
  () => {
    check();
  },
  {
    immediate: true,
  }
);

function check() {
  breadcrumb.value = menuStore.getBreadcrumb(route.name as string);
}

function handleItem(item: MenuItem) {
  router.push({
    name: item.name,
  });
}
</script>
