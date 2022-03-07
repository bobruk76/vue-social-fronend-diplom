import axios from 'axios'

const friendsLists = type => {
  switch (type) {
    case 'friends':
      return {path: 'friends', title: 'Мои друзья'}
    case 'requestsOut':
      return {path: 'friends/requests/out', title: 'Исходящие заявки'}
    case 'requestsIn':
      return {path: 'friends/requests/in', title: 'Входящие заявки'}
    case 'blocked':
      return {path: 'friends/blocked', title: 'Заблокированные пользователи'}
    case 'subscriptions':
      return {path: 'friends/subscriptions', title: 'Подписки'}
    case 'recommendations':
      return {path: 'friends/recommendations', title: 'Подписчики'}
    case 'subscribers':
      return {path: 'friends/subscribers', title: 'Рекомендации'}
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

    isShowAll: {
      friends: false,
      blocked: false,
      requestsIn: false,
      requestsOut: false,
      subscriptions: false,
      subscribers: false,
    },
  },
  getters: {
    getTitleById: s => type => friendsLists(type).title,
    getResultById: s => id => s.result[id],
    getTotalById: s => id => s.total[id],
    showNextById: s => id => s.total[id]>(s.itemPerPage[id]*(s.offset[id]+1)),
    getIsShowAll: s => id => s.isShowAll[id],
    getOffsetById: s => id => s.offset[id],
    getFriendsPerPage: s => s.friendsPerPage
  },
  mutations: {
    setIsShowAll: (s, id) => s.isShowAll[id] = !s.isShowAll[id],
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

    async apiFetchList({commit, state}, payload) {
      if (payload.deltaPage) {
        commit('changeOffset', {
          param: payload.typeList,
          d: payload.deltaPage
        })
      }
      await axios.get(friendsLists(payload.typeList).path, {
        params: {
          'offset': state.offset[payload.typeList],
          'item_per_page': state.itemPerPage[payload.typeList],
        }
      })
        .then(async response => {
          commit('setResult', {
            id: payload.typeList,
            value: response.data.data
          })
          commit('setTotal', {
            id: payload.typeList,
            value: response.data.total
          })
        })
        .catch(() => {
        })
    },
    async apiRequestsOut({dispatch}, deltaPage = null) {
      dispatch('apiFetchList', {deltaPage, typeList: 'requestsOut'})
    },
    async apiBlockedFriends({dispatch}, deltaPage = null) {
      dispatch('apiFetchList', {deltaPage, typeList: 'blocked'})
    },
    async apiSubscriptions({dispatch}, deltaPage = null) {
      dispatch('apiFetchList', {deltaPage, typeList: 'subscriptions'})
    },

    async apiRecommendations({dispatch}, deltaPage = null) {
      dispatch('apiFetchList', {deltaPage, typeList: 'subscriptions'})
    },

    async apiSubscribers({dispatch}, deltaPage = null) {
      dispatch('apiFetchList', {deltaPage, typeList: 'subscriptions'})
    },

    async apiRequestsIn({dispatch}, deltaPage = null) {
      dispatch('apiFetchList', {deltaPage, typeList: 'requestsIn'})
    },

    async apiFriends({dispatch}, deltaPage = null) {
      dispatch('apiFetchList', {deltaPage, typeList: 'friends'})
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
        dispatch('apiAllLists');
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
        dispatch('apiAllLists');
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
        dispatch('apiAllLists');
      })
    },

  }
}
