import Vue from 'vue'
import inject from '@/plugins/inject'
import router from '@/plugins/router'
import store from '@/plugins/store'
import App from './App'
import '@/directives'
import '@/filters'
import '@/mixins'
import '@/styles/index.less'

// 自定义全局组件
import globalComponent from '@/components/global'

if (process.env.NODE_ENV === 'development') {
  require('../mock')
}

global.vbus = new Vue()
Vue.config.productionTip = false

Vue.use(inject)
Vue.use(globalComponent)

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  ...App
})
