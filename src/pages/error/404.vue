<template>
  <el-result icon="error" title="404" sub-title="该页面不存在!">
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
