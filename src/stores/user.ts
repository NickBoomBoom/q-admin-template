import type { User } from "types/user"

export const useUserStore = defineStore('user', () => {

  const user = ref<User>({
    id: 0,
    token: "",
    username: "用户名称",
    nickname: "昵称",
    isAdmin: false,
    permissions: {}
  })

  async function login() {

  }

  async function logout() {

  }

  return { user, login, logout }
})
