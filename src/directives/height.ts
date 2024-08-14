let heightFunction = () => { }

function autoHeight(el: HTMLElement) {
  const parent:any = el.parentNode!
  const grandpa = parent.parentNode
  const children = parent.children
  const { height: gh } = grandpa?.getBoundingClientRect()
  const { height: ph } = parent.getBoundingClientRect()
  const vh = Math.max(gh || 0, ph)
  let h = 0
  for (let i = 0; i < children.length; i++) {
    const item = children[i]
    if (item !== el) {
      const { height } = item.getBoundingClientRect()
      h += height
    }
  }
  el.style.height = `${vh - h}px`
}

export const height = {
  // 在绑定元素的 attribute 前
  // 或事件监听器应用前调用
  created(el: HTMLElement, binding:DirectiveBinding, vnode:any) {
    // 下面会介绍各个参数的细节
  },
  // 在元素被插入到 DOM 前调用
  beforeMount(el: HTMLElement, binding:DirectiveBinding, vnode:any) { },
  // 在绑定元素的父组件
  // 及他自己的所有子节点都挂载完成后调用
  mounted(el: HTMLElement, binding:DirectiveBinding, vnode:any) {
    autoHeight(el)
  },
  // 绑定元素的父组件更新前调用
  beforeUpdate(el: HTMLElement, binding:DirectiveBinding, vnode:any, prevVnode:any) { },
  // 在绑定元素的父组件
  // 及他自己的所有子节点都更新后调用
  updated(el: HTMLElement, binding:DirectiveBinding, vnode:any, prevVnode:any) { },
  // 绑定元素的父组件卸载前调用
  beforeUnmount(el: HTMLElement, binding:DirectiveBinding, vnode:any) { },
  // 绑定元素的父组件卸载后调用
  unmounted(el: HTMLElement, binding:DirectiveBinding, vnode:any) { }
}
