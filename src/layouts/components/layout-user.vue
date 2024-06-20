<template>
  <div>
    <el-dropdown @command="handleUserCommand">
      <div class="flex items-center">
        <span class="i-mdi-account text-xl" />
        <span class="ml-1 mr-0.5">
          {{ name }}
        </span>
        <span class="i-mdi-chevron-down text-xl" />
      </div>
      <template #dropdown>
        <el-dropdown-menu>
          <el-dropdown-item
            v-for="item in userDropdown"
            :key="item.command"
            :command="item.command"
          >
            <div :class="item.icon" class="mr-1"></div>
            {{ item.name }}
          </el-dropdown-item>
        </el-dropdown-menu>
      </template>
    </el-dropdown>
  </div>
</template>
<script setup lang="ts">
enum UserCommand {
  CHANGE_PWD,
  LOGOUT
}
const userStore = useUserStore()
const { user } = storeToRefs(userStore)
const name = computed(() => {
  const { nickname, username } = user.value
  return username || nickname
})
const userDropdown = [
  {
    icon: 'i-mdi-onepassword',
    name: '修改密码',
    command: UserCommand.CHANGE_PWD
  },
  {
    icon: 'i-mdi-logout',
    name: '退出',
    command: UserCommand.LOGOUT
  }
]

function handleUserCommand(command: number) {
  switch (command) {
    case UserCommand.CHANGE_PWD:
      console.log('修改密码')
      break
    case UserCommand.LOGOUT:
      console.log('退出')
      break
  }
}
</script>
