import axios from 'axios'

export default {
  namespaced: true,
  state: {
    friendsPerPage: 1,
    result: {
      friends: [],
      requestsIn: [],
      requestsOut: [],
      blocked: [],
      recommendations: [],
      subscriptions: [],
      subscribers: []
    },
  },
  getters: {
    getResultById: s => id => s.result[id],
    getFriendsPerPage: s => s.friendsPerPage
  },
  mutations: {
    setResult: (s, payload) => s.result[payload.id] = payload.value,
    setFriendsPerPage: (s, payload) => s.friendsPerPage = payload.value,
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
      }).then(async response => {
        commit('setResult', {
          id: 'friends',
          value: response.data.data
        })
      }).catch(error => {

      }).then(() => {
        dispatch('apiRequestsIn');
        dispatch('apiRequestsOut');
        dispatch('apiBlockedFriends');
        dispatch('apiRecommendations');
        dispatch('apiSubscriptions');
        dispatch('apiSubscribers');
      })
    },
    async apiDeleteFriends({dispatch}, id) {
      await axios.delete(`friends/${id}`
      ).then(async response => {
        dispatch('global/alert/setAlert', {
          status: 'success',
          text: 'Пользователь удален из друзей'
        }, {
          root: true
        })
      }).catch(() => {

      }).then(() => {
        dispatch('apiFriends');
      })
    },
    async apiDeleteRequest({dispatch}, id) {
      await axios.delete(`friends/requests/${id}`
      ).then(async response => {
        dispatch('global/alert/setAlert', {
          status: 'success',
          text: 'Заявка на добавление в друзья отозвана'
        }, {
          root: true
        })
      }).catch(error => {

      }).then(() => {
        dispatch('apiFriends');
      })
    },
    async apiAddFriends({dispatch}, id) {
      await axios.post(`friends/${id}`
      ).then(async response => {
        dispatch('global/alert/setAlert', {
          status: 'success',
          text: 'Заявка отправлена'
        }, {
          root: true
        })
      }).catch(() => {

      }).then(() => {
        dispatch('apiFriends');
      })
    },
    async apiRequestsIn({
                          commit
                        }, payload) {
      let query = []
      payload && Object.keys(payload).map(el => {
        payload[el] && query.push(`${el}=${payload[el]}`)
      })
      await axios({
        url: `friends/requests/in?${query.join('&')}`,
        method: 'GET'
      }).then(async response => {
        commit('setResult', {
          id: 'requestsIn',
          value: response.data.data
        })
      }).catch(() => {
      })
    },
    async apiRequestsOut({
                           commit
                         }, payload) {
      let query = []
      payload && Object.keys(payload).map(el => {
        payload[el] && query.push(`${el}=${payload[el]}`)
      })
      await axios({
        url: `friends/requests/out?${query.join('&')}`,
        method: 'GET'
      }).then(response => {
        commit('setResult', {
          id: 'requestsOut',
          value: response.data.data
        })
      }).catch(error => {
      })
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
        commit('setResult', {
          id: 'blocked',
          value: response.data.data
        })
      }).catch(error => {
      })
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
      }).catch(error => {
      })
    },
    async apiSubscriptions({
                             commit
                           }, payload) {
      let query = []
      payload && Object.keys(payload).map(el => {
        payload[el] && query.push(`${el}=${payload[el]}`)
      })
      await axios({
        url: `friends/subscriptions?${query.join('&')}`,
        method: 'GET'
      }).then(response => {
        commit('setResult', {
          id: 'subscriptions',
          value: response.data.data
        })
      }).catch(error => {
      })
    },
    async apiDeleteSubscriptions({dispatch}, id) {
      await axios.delete(`friends/subscriptions/${id}`
      ).then(async response => {
        dispatch('global/alert/setAlert', {
          status: 'success',
          text: 'Заявка на подписку отозвана'
        }, {
          root: true
        })
      }).catch(() => {
      }).then(() => {
        dispatch('apiFriends');
      })
    },
    async apiSubscribers({
                           commit
                         }, payload) {
      let query = []
      payload && Object.keys(payload).map(el => {
        payload[el] && query.push(`${el}=${payload[el]}`)
      })
      await axios({
        url: `friends/subscribers?${query.join('&')}`,
        method: 'GET'
      }).then(response => {
        commit('setResult', {
          id: 'subscribers',
          value: response.data.data
        })
      }).catch(error => {
      })
    },
  }
}
