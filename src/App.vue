<template>
  <el-config-provider :locale="elConfig.locale" :size="elConfig.size">
    <RouterView />
  </el-config-provider>
</template>

<script setup lang="ts">
import zhCn from 'element-plus/es/locale/lang/zh-cn'
import plusZhCn from 'plus-pro-components/es/locale/lang/zh-cn'

const elConfig = {
  locale: {
    ...zhCn,
    ...plusZhCn
  },
  size: 'default'
}
</script>
