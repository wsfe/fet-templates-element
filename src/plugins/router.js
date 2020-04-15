import Vue from 'vue'
import VueRouter from 'vue-router'
import ROUTES from '@/routes'
import { ROUTER_DEFAULT_CONFIG } from '@/config'

Vue.use(VueRouter)

// 注入默认配置和路由表
const routerInstance = createRouter()
// 注入拦截器

function createRouter () {
  return new VueRouter({
    ...ROUTER_DEFAULT_CONFIG,
    routes: ROUTES
  })
}

// Detail see: https://github.com/vuejs/vue-router/issues/1234#issuecomment-357941465
export function resetRouter () {
  const newRouter = createRouter()
  routerInstance.matcher = newRouter.matcher // reset router
}

export default routerInstance
