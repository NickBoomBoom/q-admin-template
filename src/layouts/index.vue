<template>
  <el-config-provider :locale="elConfig.locale" :size="elConfig.size">
    <layout-base v-if="systemConfig.layout === 'base'" />
    <layout-top v-else-if="systemConfig.layout === 'top'" />
  </el-config-provider>
</template>

<script setup lang="ts">
import zhCn from 'element-plus/es/locale/lang/zh-cn'
import plusZhCn from 'plus-pro-components/es/locale/lang/zh-cn'

const LayoutBase = defineAsyncComponent(() => import('./layout-base/index.vue'))
const LayoutTop = defineAsyncComponent(() => import('./layout-top/index.vue'))
const globalStore = useGlobalStore()
const { systemConfig } = storeToRefs(globalStore)
const elConfig: any = {
  locale: {
    ...zhCn,
    ...plusZhCn
  },
  size: 'default'
}
</script>
