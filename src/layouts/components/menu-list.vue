<template>
  <template v-for="item in menuList" :key="item.path">
    <el-sub-menu v-if="item.children" :index="getIndex(item)">
      <template #title>
        <el-icon>
          <div :class="item.meta?.icon" class="text-2xl"></div>
        </el-icon>
        <span class="title">{{ item.meta?.title }}</span>
        <b
          v-if="item.meta.count"
          class="menu-count rounded-full text-white flex items-center justify-center bg-primary p-2 h-5"
        >
          {{ item.meta.count }}
        </b>
      </template>
      <MenuList v-model:menuList="item.children" :lastPath="item.path" />
    </el-sub-menu>

    <el-menu-item
      v-if="!item.children"
      :index="getIndex(item)"
      :title="item.meta.title"
      @click="handleSelect(item)"
    >
      <template #default>
        <el-icon>
          <div :class="item.meta?.icon" class="text-2xl"></div>
        </el-icon>

        <span class="title">{{ item.meta.title }}</span>
        <b
          v-if="item.meta.count"
          class="menu-count rounded-full text-white flex items-center justify-center bg-primary p-2 h-5"
        >
          {{ item.meta.count }}
        </b>
      </template>
    </el-menu-item>
  </template>
</template>

<script setup lang="ts">
const router = useRouter();
const props = defineProps<{
  menuList: any[];
  lastPath?: string;
}>();

const MenuList = defineAsyncComponent({
  loader: () => import("@layouts/components/menu-list.vue"),
});

function getIndex(item: TAB_ITEM) {
  const { fullPath, path } = item;
  if (fullPath) {
    return fullPath;
  }
  const arr = [props.lastPath, path].filter((t) => !!t);
  return arr.join("/");
}
function handleSelect(row: any) {
  const { path, name, query, params } = row;
  if (isUrl(path)) {
    window.open(path);
  } else {
    router.push({
      name,
      query,
      params,
    });
  }
}
</script>

<style lang="scss">
#layout-menu {
  .el-menu-item {
    .title {
      flex: 1;
    }
  }
  .el-sub-menu {
    &__title {
      .title {
        flex: 1;
      }
    }
  }
  &.el-menu--collapse {
    .menu-count {
      position: absolute;
      right: 2px;
      top: 2px;
      transform: scale(0.8);
    }
  }
}
.layout-menu-popper {
  .el-menu-item {
    .title {
      flex: 1;
    }
  }
}
</style>
