export default {
  namespaced: true,
  state: {
    status: 'success',
    text: 'Сделано!',
    show: false,
    timeout: 5000
  },
  getters: {
    getState: s => s
  },
  mutations: {
    setInfo(state, value) {
      state.status = value.status
      state.text = value.text
    },
    toggleShow: s => s.show = !s.show,
    onShow: s => s.show = true,
    offShow: s => s.show = false,
  },
  actions: {
    setAlert({commit, state}, value) {
      commit('setInfo', value)
      commit('onShow')
      setTimeout(() => {
        commit('offShow')
      }, state.timeout)
    }
  }
}
