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
    setSearchTags: (s, value) => s.searchTags = value,
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
      commit('setSearchTags', '')
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
      await axios.get(`users/search`,{
        params: {
          ...payload
        }
      }).then(async response => {
          console.log("TCL: searchUsers -> response", response)
          commit('setResult', {
            id: 'users',
            value: response.data.data
          })
        }).catch(async error => {
        })
    },
    async searchNews({commit}, payload) {
      if (!payload || !payload.text) {
        alert('введите текст в поиск')
        return false
      }
      let query = []
      payload && Object.keys(payload).map(el => {
        payload[el] && query.push(`${el}=${payload[el]}`)
      })
      await axios({
        url: `post?${query.join('&')}`,
        method: 'GET'
      }).then(async response => {
        console.log("TCL: searchNews -> response", response.data.data)
        commit('setResult', {
          id: 'news',
          value: response.data.data
        })
      }).catch(error => {
      })
    },
    async searchAll({dispatch, commit}, text) {
      commit('setSearchText', text)
      await dispatch('searchUsers', {
        first_name: text
      })
      await dispatch('searchNews', {
        text
      })
    }
  }
}
