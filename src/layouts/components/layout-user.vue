<template>
  <el-dropdown @command="handleUserCommand">
    <div class="flex items-center" :style="styles">
      <span class="i-material-symbols-account-circle text-xl" />
      <span class="ml-1 mr-0.5">
        {{ name }}
      </span>
      <i class="i-material-symbols-keyboard-arrow-down text-xl" />
    </div>
    <template #dropdown>
      <el-dropdown-menu>
        <el-dropdown-item v-for="item in userDropdown" :key="item.command" :command="item.command">
          <div :class="item.icon" class="mr-1"></div>
          {{ item.name }}
        </el-dropdown-item>
      </el-dropdown-menu>
    </template>
  </el-dropdown>
  <update-pwd-dialog ref="updatePwdDialogRef" />
</template>
<script setup lang="ts">
enum UserCommand {
  CHANGE_PWD,
  LOGOUT
}
const props = withDefaults(
  defineProps<{
    color?: string
  }>(),
  {
    color: 'black'
  }
)
const globalStore = useGlobalStore()
const { user } = storeToRefs(globalStore)
const updatePwdDialogRef = ref()
const name = computed(() => {
  const { nickname, username } = user.value
  return username || nickname
})
const styles = computed(() => {
  return {
    color: props.color
  }
})
const userDropdown = [
  {
    icon: 'i-material-symbols-password',
    name: '修改密码',
    command: UserCommand.CHANGE_PWD
  },
  {
    icon: 'i-material-symbols-exit-to-app-sharp',
    name: '退出',
    command: UserCommand.LOGOUT
  }
]

function handleUserCommand(command: number) {
  switch (command) {
    case UserCommand.CHANGE_PWD:
      updatePwdDialogRef.value.open()
      break
    case UserCommand.LOGOUT:
      globalStore.logout()
      break
  }
}
</script>
