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
    layout: 'base' | 'top'
  }

  interface User {
    token: string
    id: number
    username: string
    nickname: string
    isAdmin: boolean
    permissions: any
  }

  interface PageScroll {
    x: number
    y: number
    scrollTop: number
    scrollLeft: number
    refEl: Ref
  }

  interface ScrollbarScroll {
    scrollTop: number
    scrollLeft: number
  }
}
