export { }
declare global {
  interface Option {
    label: string | number
    value: any
  }

  interface SystemConfig {
    title: string
    subTitle?: string
    logo: string
    footer?: string
  }

  interface User {
    token: string
    id: number
    username: string
    nickname: string
    isAdmin: boolean
    permissions: any
  }

}
