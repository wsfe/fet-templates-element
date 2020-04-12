import consts from './const'
import axios from './axios'
import api from './api'
import router from './router'
import store from './store'
import havePerimission from './permission'
import interceptor from '@/config/interceptors'

// 全局ajax
global.ajax = axios

// 设置拦截器
// 为了防止router, store, axios等出现循环引用，所以放在一起集中处理
interceptor({router, store, axios, api})

export default {
  install: (Vue, options) => {
    // 需要挂载的都放在这里
    Vue.prototype.$ajax = axios
    Vue.prototype.$api = api
    Vue.prototype.$const = consts
    Vue.prototype.$permission = havePerimission
  }
}
