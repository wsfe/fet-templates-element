import havePermission from '@/plugins/permission'

export default {
  inserted (el, binding, vnode, oldVnode) {
    const { context } = vnode
    if (!havePermission(binding.value, context.$route.name)) {
      if (vnode.componentInstance) {
        vnode.componentInstance.$destroy()
      }
      el.remove()
    }
  }
}
