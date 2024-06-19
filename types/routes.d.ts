// 全局路由类型声明
// https://router.vuejs.org/zh/guide/advanced/meta.html#typescript
import 'vue-router'
export { }
declare module "vue-router" {
  interface RouteMeta {
    // 路由名称,动态路由可不声明
    title?: string;
    // 是否显示在菜单栏上
    showMenu?: boolean;
    // 外部链接
    link?: string;
    // keepalive 默认全开,通过 full path 当 key; 关闭请设置为true
    noCache?: boolean;
    // icon  统一使用:https://icones.js.org/collection/mdi 中的 icon
    icon?: string;

  }
}
