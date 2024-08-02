<template>
  <el-config-provider :locale="elConfig.locale" :size="elConfig.size">
    <router-view />
  </el-config-provider>
</template>
<script setup lang="ts">
import zhCn from 'element-plus/es/locale/lang/zh-cn'
import plusZhCn from 'plus-pro-components/es/locale/lang/zh-cn'

const elConfig: any = {
  locale: {
    ...zhCn,
    ...plusZhCn
  },
  size: 'default'
}
</script>
