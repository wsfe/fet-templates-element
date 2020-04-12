import NProgress from 'nprogress' // progress bar

let router = null
let store = null
const whiteList = ['/login'] // no redirect whitelist

async function routerBeforeEachFunc (to, from, next) {
  // 页面拦截、权限处理
  NProgress.start()
  // TODO 设置页面title
  document.title = to.meta.title || ''
  if (store.getters.name) {
    if (to.path === '/login') {
      next({path: '/'}) // TODO 如果有重定向的话直接指向重定向地址
      NProgress.done()
    } else {
      next()
    }
  } else {

    if (whiteList.indexOf(to.path) !== -1) {
      // in the free login whitelist, go directly
      next()
    } else {
      try {
        await store.dispatch('user/getInfo')
        // TODO 动态加载路由
        next({...to, replace: true})
        // other pages that do not have permission to access are redirected to the login page.
      } catch (err) {
        next(`/login?redirect=${to.path}`)
      } finally {
        NProgress.done()
      }
    }
  }
}

function routerAfterEachFunc (to, from) {
  NProgress.done()
}

export default (pluginInstances) => {
  router = pluginInstances.router
  store = pluginInstances.store
  router.beforeEach(routerBeforeEachFunc)
  router.afterEach(routerAfterEachFunc)
}
