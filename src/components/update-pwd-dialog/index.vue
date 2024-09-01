<template>
  <PlusDialogForm
    v-model:visible="show"
    v-model="model"
    :form="form"
    :dialog="dialog"
    @confirm="handleDialogConfirm"
    ref="dialogFormRef"
  />
</template>

<script setup lang="ts">
import type { PlusColumn } from 'plus-pro-components'
import { Md5 } from 'ts-md5'

const show = ref(false)
const globalStore = useGlobalStore()
const { user } = storeToRefs(globalStore)
const dialog = ref({
  title: '修改密码',
  width: '400px',
  confirmLoading: false,
  destroyOnClose: true,
  // appendToBody: true
})
const form: {
  labelWidth: string
  columns: PlusColumn[]
  rules: any
} = {
  labelWidth: '80px',
  columns: [
    {
      label: '旧密码',
      prop: 'oldPassword',
      fieldProps: {
        type: 'password',
        showPassword: true,
        autocomplete: 'new-password'
      }
    },
    {
      label: '新密码',
      prop: 'newPassword',
      fieldProps: {
        type: 'password',
        showPassword: true,
        autocomplete: 'new-password'
      }
    }
  ],
  rules: {
    oldPassword: [
      {
        required: true,
        message: '请输入旧密码',
        trigger: ['blur', 'change']
      }
    ],
    newPassword: [
      {
        required: true,
        message: '请输入新密码',
        trigger: ['blur', 'change']
      },
      { min: 6, max: 10, message: '密码长度应在 6 到 10 个字符之间' }
    ]
  }
}
const model = ref({
  oldPassword: undefined,
  nwePassword: undefined
})

function open() {
  show.value = true
}

function close() {
  show.value = false
}

async function handleDialogConfirm(value: any) {
  console.log(value)

  try {
    dialog.value.confirmLoading = true
    // TODO:修改密码api
    // await userApi.updatePwd(user.value.id, {
    //   oldPassword: Md5.hashStr(value.oldPassword),
    //   newPassword: Md5.hashStr(value.newPassword)
    // })
    ElMessage.success('修改密码成功! 请重新登录!')
    globalStore.logout()
    close()
  } catch (error) {
    console.error(error)
  } finally {
    dialog.value.confirmLoading = false
  }
}

defineExpose({
  open,
  close
})
</script>
