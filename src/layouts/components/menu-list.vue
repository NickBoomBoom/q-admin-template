<template>
  <template v-for="item in menuList" :key="item.path">
    <el-sub-menu v-if="item.children" :index="getIndex(item)">
      <template #title>
        <el-icon>
          <div :class="item.meta?.icon" class="text-2xl"></div>
        </el-icon>
        <span>{{ item.meta?.title }}</span>
      </template>
      <MenuList v-model:menuList="item.children" :lastPath="item.path" />
    </el-sub-menu>

    <el-menu-item
      v-if="!item.children && !item.meta.hideInMenus"
      :index="getIndex(item)"
      @click="handleSelect(item)"
    >
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
const router = useRouter()
const props = defineProps<{
  menuList: any[]
  lastPath?: string
}>()

const MenuList = defineAsyncComponent({
  loader: () => import('@layouts/components/menu-list.vue')
})

function getIndex(item: TAB_ITEM) {
  const { fullPath, path } = item
  if (fullPath) {
    return fullPath
  }
  const arr = [props.lastPath, path].filter(t=>!!t)
  return arr.join('/')
}
function handleSelect(row: any) {
  const { path, name, query, params } = row
  if (isUrl(path)) {
    window.open(path)
  } else {
    router.push({
      name,
      query,
      params
    })
  }
}
</script>
