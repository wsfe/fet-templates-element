// 环境
export const NODE_ENV = process.env.NODE_ENV || 'production'

// 路由默认配置，路由表并不从此注入
export const ROUTER_DEFAULT_CONFIG = {
  mode: 'history',
  base: '/',
  waitForData: true,
  transitionOnLoad: true,
  scrollBehavior (to, from, savedPosition) {
    return { x: 0, y: 0 }
  }
}

// axios 默认配置
export const AXIOS_DEFAULT_CONFIG = {
  timeout: 20000,
  maxContentLength: 2000,
  headers: {},
  baseURL: '/api'
}

// vuex 默认配置
export const VUEX_DEFAULT_CONFIG = {
  strict: NODE_ENV !== 'production'
}

// API 默认配置
export const API_DEFAULT_CONFIG = {
  debug: NODE_ENV !== 'production',
  sep: '/'
}

// CONST 默认配置
export const CONST_DEFAULT_CONFIG = {
  sep: '/'
}

// 还有一些方便开发的配置
export const CONSOLE_REQUEST_ENABLE = NODE_ENV !== 'production' // 开启请求参数打印
export const CONSOLE_RESPONSE_ENABLE = NODE_ENV !== 'production' // 开启响应参数打印

export const APP_SETTINGS = {
  title: 'fet Element Admin',

  /**
   * @type {boolean} true | false
   * @description Whether show the settings right-panel
   */
  showSettings: true,

  /**
   * @type {boolean} true | false
   * @description Whether need tagsView
   */
  tagsView: true,

  /**
   * @type {boolean} true | false
   * @description Whether fix the header
   */
  fixedHeader: false,

  /**
   * @type {boolean} true | false
   * @description Whether show the logo in sidebar
   */
  sidebarLogo: false,

  /**
   * @type {string | array} 'production' | ['production', 'development']
   * @description Need show err logs component.
   * The default is only used in the production env
   * If you want to also use it in dev, you can pass ['production', 'development']
   */
  errorLog: 'production'
}
