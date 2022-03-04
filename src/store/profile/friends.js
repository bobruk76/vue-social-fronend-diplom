import axios from 'axios'

export default {
  namespaced: true,
  state: {
    offsetFriends: 0,
    itemPerPageFriends: 5,

    offsetRequestsOut: 0,
    itemPerPageRequestsOut: 5,

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
    incrementOffset: (s, param) => s[param]++,
    setResult: (s, payload) => s.result[payload.id] = payload.value,
    setFriendsPerPage: (s, payload) => s.friendsPerPage = payload.value,
  },
  actions: {
    async apiAllLists({dispatch}) {
      dispatch('apiFriends')
      dispatch('apiRequestsIn')
      dispatch('apiRequestsOut')
      dispatch('apiBlockedFriends')
      dispatch('apiRecommendations')
      dispatch('apiSubscriptions')
      dispatch('apiSubscribers')
    },
    async apiFriends({commit, dispatch, state}, payload = null) {
      await axios.get('friends', {
        params: {
          ...payload,
          offset: state.offsetFriends,
          item_per_page: state.itemPerPageFriends,
        }
      })
        .then(async response => {
          commit('setResult', {
            id: 'friends',
            value: response.data.data
          })
        })
        .catch(() => {
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
    async apiRequestsOut({commit, state}) {
      await axios.get('friends/requests/out', {
        params: {
          'offset': state.offsetRequestsOut,
          'item_per_page': state.itemPerPageRequestsOut,
        }
      })
        .then(async response => {
          commit('setResult', {
            id: 'requestsOut',
            value: response.data.data
          })
          commit('incrementOffset', 'offsetRequestsOut')
        })
        .catch(() => {
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
