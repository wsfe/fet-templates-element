import Vue from 'vue'
import inject from '@/plugins/inject'
import router from '@/plugins/router'
import store from '@/plugins/store'

import ElementUI from 'element-ui'
import 'normalize.css/normalize.css' // a modern alternative to CSS resets
import './styles/element-variables.scss'
import '@/styles/index.scss' // global css

import App from './App'
import '@/directives'
import '@/filters'
import '@/mixins'

if (process.env.NODE_ENV === 'development') {
  require('../mock')
}

global.vbus = new Vue()
Vue.config.productionTip = false

Vue.use(inject)
Vue.use(ElementUI, {
  size: 'medium'
})

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  ...App
})
