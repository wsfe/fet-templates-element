import Vue from 'vue'
import Vuex from 'vuex'
import { VUEX_DEFAULT_CONFIG } from '@/config'
import defaultStore from '@/service/store'

Vue.use(Vuex)

export default new Vuex.Store({
  ...defaultStore,
  ...VUEX_DEFAULT_CONFIG
})
