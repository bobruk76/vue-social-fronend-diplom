import axios from 'axios'

const pathRequest = type => {
  switch (type) {
    case 'requestsOut':
      return 'friends/requests/out'
  }
}

export default {
  namespaced: true,
  state: {

    friendsPerPage: 1,

    total: {
      friends: 0,
      requestsIn: 0,
      requestsOut: 0,
      blocked: 0,
      recommendations: 0,
      subscriptions: 0,
      subscribers: 0
    },

    offset: {
      friends: 0,
      requestsIn: 0,
      requestsOut: 0,
      blocked: 0,
      recommendations: 0,
      subscriptions: 0,
      subscribers: 0
    },

    itemPerPage: {
      friends: 5,
      requestsIn: 5,
      requestsOut: 5,
      blocked: 5,
      recommendations: 5,
      subscriptions: 5,
      subscribers: 5
    },

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
    getState: s => s,
    getResultById: s => id => s.result[id],
    getFriendsPerPage: s => s.friendsPerPage
  },
  mutations: {
    changeOffset: (s, payload) => s.offset[payload.param] = s.offset[payload.param] + payload.d,
    setResult: (s, payload) => s.result[payload.id] = payload.value,
    setTotal: (s, payload) => s.total[payload.id] = payload.value,
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


    async apiRequestsOut({commit, state}, deltaPage = null) {
      if (deltaPage) {
        commit('changeOffset', {
          param: 'requestsOut',
          d: deltaPage
        })
      }
      await axios.get(pathRequest('requestsOut'), {
        params: {
          'offset': state.offset.requestsOut,
          'item_per_page': state.itemPerPage.requestsOut,
        }
      })
        .then(async response => {
          commit('setResult', {
            id: 'requestsOut',
            value: response.data.data
          })
          commit('setTotal', {
            id: 'requestsOut',
            value: response.data.total
          })
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
