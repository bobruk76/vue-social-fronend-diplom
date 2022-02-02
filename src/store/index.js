import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

import global from './global'
import auth from './auth'
import profile from './profile'
import users from './users'
import axios from "axios";

export default new Vuex.Store({
  namespaced: true,
  modules: {
    global,
    auth,
    profile,
    users
  },
  state: {
    code: 3675,
    captcha: {}
  },
  getters: {
    getCode: s => s.code,
    getCaptcha: s => s.captcha,
  },
  actions: {
    async loadCaptcha({commit}) {
      await axios({
        url: `auth/captcha`,
        method: 'GET'
      }).then(async response => {
        commit('setCaptcha', {
          value: response.data
        })
      }).catch((error) => {
        console.error(error.data)
      })
    },
  },
  mutations: {
    setCaptcha: (s, payload) => s.captcha = payload.value
  },
  strict: process.env.NODE_ENV !== 'production'
})
