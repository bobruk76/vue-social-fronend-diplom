import axios from 'axios'

export default {
  namespaced: true,
  state: {
    token: localStorage.getItem('user-token') || '',
    status: '',
    formErrors: {
      captcha: false,
      email: false,
    }
  },
  getters: {
    apiToken: s => s.token,
    isAuthenticated: state => !!state.token,
    authStatus: state => state.status,
    getFormErrors: state => state.formErrors,
  },
  mutations: {
    setToken: (s, token) => s.token = token,
    setStatus: (s, status) => s.status = status,
    setFormErrors(state, payload) {
      state.formErrors[payload.name] = payload.value
    },
  },
  actions: {
    async register({commit, dispatch}, user) {
      await axios({
        url: 'account/register',
        data: user,
        method: 'POST'
      }).then(async response => {
        commit('setStatus', 'success');
        dispatch('global/alert/setAlert', {
          status: 'success',
          text: 'Зарегестрирован, делаю логин'
        }, {
          root: true
        })
        // await dispatch('login', {
        //   email: user.email,
        //   password: user.passwd1
        // })
      }).catch(async error => {
        console.log(error.response.data);
        commit('setStatus', 'error');
        commit('setFormErrors', {name: error.response.data.error, value: true});
        dispatch('global/alert/setAlert', {
          status: 'error',
          text: error.response.data.error_description,
        }, {
          root: true
        })
      })
    },
    async login({commit}, user) {
      commit('setStatus', 'loading')
      await axios({
        url: 'auth/login',
        data: user,
        method: 'POST'
      }).then(async response => {
        const token = response.data.data.token
        localStorage.setItem('user-token', token)
        axios.defaults.headers.common['Authorization'] = token
        commit('setToken', token)
        commit('setStatus', 'success')
        commit('profile/info/setInfo', response.data.data, {
          root: true
        })
      }).catch(async error => {
        commit('setStatus', 'error');
        localStorage.removeItem('user-token')
      })
    },
    async logout({commit, dispatch}) {
      await axios.post('auth/logout'
      ).then(() => {
        commit('setToken', '')
        commit('setStatus', 'logout')
        dispatch('global/alert/setAlert', {
          status: 'success',
          text: 'Вы вышли из системы'
        }, {
          root: true
        })
        localStorage.removeItem('user-token')
        delete axios.defaults.headers.common['Authorization']
      }).catch(() => {
      })
    }
  }
}
