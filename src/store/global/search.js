import axios from 'axios'
import router from '@/router'

export default {
  namespaced: true,
  state: {
    searchText: '',
    searchTags: [],
    tabs: [{
      id: 'all',
      text: 'Всё'
    }, {
      id: 'users',
      text: 'Люди'
    }, {
      id: 'news',
      text: 'Новости'
    }],
    tabSelect: 'all',
    result: {
      users: [],
      news: []
    },

    total: {
      users: 0,
      news: 0
    },

    offset: {
      users: 0,
      news: 0
    },

    query: {
      users: null,
      news: null
    },

    itemPerPage: {
      users: 6,
      news: 6
    },
    status: '',
  },
  getters: {
    getQuery: s => s.query,
    searchText: s => s.searchText,
    getSearchTags: s => s.searchTags,
    tabs: s => s.tabs,
    tabSelect: s => s.tabSelect,
    getResult: s => s.result,
    getResultById: s => id => s.result[id],
    getStatus: s => s.status,
    getIsShowMoreById: s => id => s.total[id] > s.result[id].length,
  },
  mutations: {
    setSearchText: (s, value) => s.searchText = value,
    clearSearchTags: s => s.searchTags = [],
    setSearchTags: (s, value) => {
      if (typeof value === 'string') {
        value = [value];
      }
      value.map(item => {
        if (!s.searchTags.includes(item)) {
          s.searchTags.push(item)
        }
      })
    },
    delSearchTags: (s, value) => s.searchTags = s.searchTags.filter(item => item !== value),
    setTabSelect: (s, id) => s.tabSelect = id,
    routePushWithQuery(state, id) {
      let query = {}
      if (id !== 'all') query.tab = id
      if (state.searchText.length > 0) query.text = state.searchText
      router.push({
        name: 'Search',
        query
      })
    },
    setResult: (s, payload) => s.result[payload.id] = payload.value,
    setTotal: (s, payload) => s.total[payload.param] = payload.value,
    setQuery: (s, payload) => s.query[payload.param] = payload.value,
    changeOffset: (s, payload) => s.offset[payload.param] = s.offset[payload.param] + payload.d,
    clearOffset: (s, payload) => s.offset[payload.param] = 0,
    addToList: (s, payload) => payload.list.map(el => {
      if (!s.result[payload.param].includes(el)) {
        s.result[payload.param].push(el)
      }
    }),
  },
  actions: {
    clearSearch({commit}) {
      commit('setSearchText', '')
      commit('clearSearchTags')
      commit('setResult', {
        id: 'users',
        value: []
      })
      commit('setResult', {
        id: 'news',
        value: []
      })
      commit('clearOffset', {
        param: 'users'
      })
    },
    changeTab({commit}, id) {
      commit('setTabSelect', id)
      commit('routePushWithQuery', id)
    },

    async searchUsers({state, commit}) {
      await axios.get(`users/search`, {
        params: {
          ...state.query.users,
          'offset': state.offset.users,
          'limit': state.itemPerPage.users,
        }
      }).then(async response => {

        commit('addToList', {
          param: 'users',
          list: response.data.data
        })

        commit('setTotal', {
          param: 'users',
          value: response.data.total
        })

        commit('changeOffset', {
          param: 'users',
          d: response.data.total === 0 ? 0 : 1
        })

      }).catch(async () => {
      })
    },
    async searchNews({commit, state}, payload) {
      let query = []
      payload &&
      Object.keys(payload).map(el => {
        payload[el] && query.push(`${el}=${payload[el]}`)
      })
      if (state.searchTags.length > 0) {
        query.push(`tag=${state.searchTags.join(',')}`)
      }
      if (state.searchText.length > 0) {
        query.push(`text=${state.searchText}`)
      }
      await axios.get(`post?${query.join('&')}`)
        .then(async response => {
          commit('setResult', {
            id: 'news',
            value: response.data.data
          })
        }).catch(async error => {
        })
    },
    async searchAll({state, dispatch, commit}, text) {
      dispatch('clearSearch')
      commit('setSearchText', text)

      commit('setQuery', {
        param: 'users',
        value: {
          first_name: state.searchText,
        }
      })
      await dispatch('searchUsers')
      await dispatch('searchNews', {})
    }
  }
}
