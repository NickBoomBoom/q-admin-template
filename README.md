# q-admin-template

# 图标方案

https://icones.js.org/collection/material-symbols

# 重点

所有的路由携带参数都通过query方式携带
保留关键词:

1. redirect 重定向url
2. t tab栏自定义名称
3. token

# 全局方案

## 1. rxjs

使用 rxjs 做事件总线

## 2. pinia

使用 pinia 做全局状态管理

# element-plus 兼容

## 1. 部分组件没有small样式,对部分组件添加attribute[size="small"]

目前支持的组件: el-card, el-tabs
