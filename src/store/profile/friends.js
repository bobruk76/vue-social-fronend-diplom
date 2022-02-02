import axios from 'axios'

export default {
  namespaced: true,
  state: {
    result: {
      friends: [],
      request: [],
      blocked: [],
      recommendations: []
    }
  },
  getters: {
    getResult: s => s.result,
    getResultById: s => id => s.result[id]
  },
  mutations: {
    setResult: (s, payload) => s.result[payload.id] = payload.value
  },
  actions: {
    async apiFriends({
      commit, dispatch
    }, payload) {
      let query = []
      payload && Object.keys(payload).map(el => {
        payload[el] && query.push(`${el}=${payload[el]}`)
      })
      await axios({
        url: `friends?${query.join('&')}`,
        method: 'GET'
      }).then(response => {
        // console.log("TCL: friends", response)
        commit('setResult', {
          id: 'friends',
          value: response.data.data
        })
      }).catch(error => {

      }).then(()=>{
        dispatch('apiRequest');
        dispatch('apiBlockedFriends');
        dispatch('apiRecommendations');
      })
    },
    apiDeleteFriends({
      dispatch
    }, id) {
      axios({
        url: `friends/${id}`,
        method: 'DELETE'
      }).then(response => {
        console.log("TCL: response", response)
        dispatch('global/alert/setAlert', {
          status: 'success',
          text: 'Пользователь удален из друзей'
        }, {
          root: true
        })
      }).catch(error => {

      }).then(()=>{
        dispatch('apiFriends');
      })
    },
    apiAddFriends({
      dispatch
    }, id) {
      axios({
        url: `friends/${id}`,
        method: 'POST'
      }).then(response => {
        console.log("TCL: response", response)
        dispatch('global/alert/setAlert', {
          status: 'success',
          text: 'Заявка отправлена'
        }, {
          root: true
        })
      }).catch(error => {

      }).then(()=>{
        dispatch('apiFriends');
      })
    },
    async apiRequest({
      commit
    }, payload) {
      let query = []
      payload && Object.keys(payload).map(el => {
        payload[el] && query.push(`${el}=${payload[el]}`)
      })
      await axios({
        url: `friends/request?${query.join('&')}`,
        method: 'GET'
      }).then(response => {
        console.log("TCL: request", response)
        commit('setResult', {
          id: 'request',
          value: response.data.data
        })
      }).catch(error => {})
    },
    async apiBlockedFriends({
      commit
    }, payload) {
      let query = []
      payload && Object.keys(payload).map(el => {
        payload[el] && query.push(`${el}=${payload[el]}`)
      })
      await axios({
        url: `friends/blocked?${query.join('&')}`,
        method: 'GET'
      }).then(response => {
        console.log("TCL: request", response)
        commit('setResult', {
          id: 'blocked',
          value: response.data.data
        })
      }).catch(error => {})
    },
    async apiRecommendations({
      commit
    }, payload) {
      let query = []
      payload && Object.keys(payload).map(el => {
        payload[el] && query.push(`${el}=${payload[el]}`)
      })
      await axios({
        url: `friends/recommendations?${query.join('&')}`,
        method: 'GET'
      }).then(response => {
        commit('setResult', {
          id: 'recommendations',
          value: response.data.data
        })
      }).catch(error => {})
    }
  }
}
