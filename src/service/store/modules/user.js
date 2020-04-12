import { removeToken } from '@/utils/auth'
import { resetRouter } from '@/plugins/router'
import api from '@/plugins/api'

const state = {
  name: '',
  avatar: '',
  introduction: ''
}

const mutations = {
  SET_INTRODUCTION: (state, introduction) => {
    state.introduction = introduction
  },
  SET_NAME: (state, name) => {
    state.name = name
  },
  SET_AVATAR: (state, avatar) => {
    state.avatar = avatar
  }
}

const actions = {
  // user login
  login ({ commit }, userInfo) {
    return api['user/login'](userInfo).then((data) => {
      const {name, avatar, introduction} = data
      commit('SET_NAME', name)
      commit('SET_AVATAR', avatar)
      commit('SET_INTRODUCTION', introduction)
      return Promise.resolve(data)
    })
  },

  // get user info
  getInfo ({ commit }) {
    return api['user/getInfo']().then(data => {
      const { name, avatar, introduction } = data
      commit('SET_NAME', name)
      commit('SET_AVATAR', avatar)
      commit('SET_INTRODUCTION', introduction)
    })
  },

  // user logout
  logout ({ commit, state, dispatch }) {
    removeToken()
    resetRouter()
    dispatch('tagsView/delAllViews', null, { root: true })
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}
