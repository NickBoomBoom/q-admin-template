<template>
  <el-result icon="warning" title="403" sub-title="抱歉,您暂无权限访问该页面,请联系管理员~">
    <template #extra>
      <el-button type="primary" @click="back">返回</el-button>
      <el-button @click="globalStore.logout">重新登录</el-button>
    </template>
  </el-result>
</template>
<script setup lang="ts">
const router = useRouter()
const globalStore = useGlobalStore()
function back() {
  router.back()
}
</script>
