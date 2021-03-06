import {APP_SETTINGS} from '@/config'

const { showSettings, tagsView, fixedHeader, sidebarLogo } = APP_SETTINGS

const state = {
  showSettings: showSettings,
  tagsView: tagsView,
  fixedHeader: fixedHeader,
  sidebarLogo: sidebarLogo
}

const getters = {
  showSettings (state) {
    return state.showSettings
  },
  needTagsView (state) {
    return state.tagsView
  },
  fixedHeader (state) {
    return state.fixedHeader
  },
  sidebarLogo (state) {
    return state.sidebarLogo
  }
}

const mutations = {
  CHANGE_SETTING: (state, { key, value }) => {
    if (Object.prototype.hasOwnProperty.call(state, key)) {
      state[key] = value
    }
  }
}

const actions = {
  changeSetting ({ commit }, data) {
    commit('CHANGE_SETTING', data)
  }
}

export default {
  namespaced: true,
  state,
  getters,
  mutations,
  actions
}
