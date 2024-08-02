<template>
  <div class="login w-screen h-screen overflow-hidden">
    <div
      class="w-160 h-70 mx-auto mt-1/4 flex shadow-xl shadow-black shadow-op-40 rounded-2xl overflow-hidden"
    >
      <img
        height="100%"
        class="w-1/2 object-cover"
        src="https://pic.imgdb.cn/item/66ad1df0d9c307b7e9bbfbd4.jpg"
      />
      <div class="w-1/2 bg-white flex items-center justify-center p-8">
        <PlusForm
          v-model="form.model"
          submitText="登录"
          footerAlign="center"
          labelWidth="55px"
          :columns="form.columns"
          :rules="form.rules"
          :submitLoading="form.loading"
          @submit="login"
          @keyup.enter="login"
          :hasReset="false"
        />
      </div>
    </div>
  </div>
</template>
<script setup lang="ts">
import type { PlusColumn } from 'plus-pro-components'
const globalStore = useGlobalStore()
const route = useRoute()
const router = useRouter()
const form = ref<{
  columns: PlusColumn[]
  rules: any
  model: any
  loading: boolean
}>({
  loading: false,
  model: {
    username: 'admin',
    password: '123456'
  },
  rules: {
    username: [
      {
        required: true,
        message: '请输入账号'
      }
    ],
    password: [
      {
        required: true,
        message: '请输入密码'
      }
    ]
  },
  columns: [
    {
      label: '账号',
      prop: 'username'
    },
    {
      label: '密码',
      prop: 'password',
      fieldProps: {
        type: 'password',
        showPassword: true
      }
    }
  ]
})
async function login() {
  form.value.loading = true
  const res = await globalStore.login(form.value.model)
  const {
    query: { redirect }
  } = route
  if (redirect) {
    window.location.replace(redirect as string)
  } else {
    router.replace(res)
  }
  form.value.loading = false
}
</script>
<style scoped lang="scss">
.login {
  background: url('https://pic.imgdb.cn/item/66ad1df0d9c307b7e9bbfbd4.jpg') no-repeat center/cover;
}
</style>
