import Vue from 'vue'
import store from '@/plugins/store'
import { isString, isArray } from '@/utils/validate'
import {APP_SETTINGS, NODE_ENV} from '@/config'

// you can set in settings.js
// errorLog:'production' | ['production', 'development']
const { errorLog: needErrorLog } = APP_SETTINGS

function checkNeed () {
  if (isString(needErrorLog)) {
    return NODE_ENV === needErrorLog
  }
  if (isArray(needErrorLog)) {
    return needErrorLog.includes(NODE_ENV)
  }
  return false
}

if (checkNeed()) {
  Vue.config.errorHandler = function (err, vm, info, a) {
  // Don't ask me why I use Vue.nextTick, it just a hack.
  // detail see https://forum.vuejs.org/t/dispatch-in-vue-config-errorhandler-has-some-problem/23500
    Vue.nextTick(() => {
      store.dispatch('errorLog/addErrorLog', {
        err,
        vm,
        info,
        url: window.location.href
      })
      console.error(err, info)
    })
  }
}
