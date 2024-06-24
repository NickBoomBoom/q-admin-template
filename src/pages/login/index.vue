<template>
  <el-form class="w-xs mx-auto mt-50" ref="formRef" :model="model">
    <el-form-item prop="username" label="账号">
      <el-input v-model="model.username" />
    </el-form-item>

    <el-form-item prop="password" label="密码">
      <el-input v-model="model.username" type="password" />
    </el-form-item>

    <el-form-item>
      <el-button type="primary" @click="login">登录</el-button>
    </el-form-item>
  </el-form>
</template>
<script setup lang="ts">
const formRef = ref()
const globalStore = useGlobalStore()
const router = useRouter()
const loading = ref(false)
const model = ref({
  username: '',
  password: ''
})
async function login() {
  loading.value = true
  await globalStore.login(model.value)
  loading.value = false
}
</script>
