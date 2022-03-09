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
    status: '',
  },
  getters: {
    searchText: s => s.searchText,
    getSearchTags: s => s.searchTags,
    tabs: s => s.tabs,
    tabSelect: s => s.tabSelect,
    getResult: s => s.result,
    getResultById: s => id => s.result[id],
    getStatus: s => s.status
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
    setResult: (s, result) => s.result[result.id] = result.value
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
    },
    changeTab({commit}, id) {
      commit('setTabSelect', id)
      commit('routePushWithQuery', id)
    },
    async searchUsers({commit}, payload) {
      await axios.get(`users/search`, {
        params: {
          ...payload
        }
      }).then(async response => {
        commit('setResult', {
          id: 'users',
          value: response.data.data
        })
      }).catch(async error => {
      })
    },
    async searchNews({commit, state}, payload) {
      let query = []
      payload &&
      Object.keys(payload).map(el => {
        payload[el] && query.push(`${el}=${payload[el]}`)
      })
      if (state.searchTags.length >0) {
        query.push(`tag=${state.searchTags.join(',')}`)
      }
      if (state.searchText.length >0) {
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
    async searchAll({dispatch, commit}, text) {
      commit('setSearchText', text)
      await dispatch('searchUsers', {
        first_name: text
      })
      await dispatch('searchNews',{})
    }
  }
}
