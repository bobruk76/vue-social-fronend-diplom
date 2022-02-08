import axios from 'axios'

export default {
  namespaced: true,
  state: {
    feeds: [],
    offset: 0,
    itemPerPage: 3,
    totalFeeds: 0
  },
  getters: {
    getFeeds: s => s.feeds,
    getIsShowMore: s => s.totalFeeds > s.feeds.length,
  },
  mutations: {
    setOffset: (s, payload) => s.offset = payload,
    setTotalFeeds: (s, payload) => s.totalFeeds = payload,
    incrementOffset: s => s.offset++,
    setItemPerPage: (s, payload) => s.itemPerPage = payload,

    setFeeds: (s, feeds) => s.feeds = feeds,
    appendFeeds: (s, feeds) => feeds.map(el => s.feeds.push(el)),
    setCommentsById: (s, payload) => {
      s.feeds[s.feeds.indexOf(s.feeds.find(el => el.id === payload.post_id))].comments = payload.value
      s.feeds.push('dog-nail')
      s.feeds.splice(-1, 1)
    },
    setFeedsById: (s, payload) => s.feeds[s.feeds.indexOf(s.feeds.find(el => el.id === payload.id))] = payload
  },
  actions: {
    async apiFeeds({commit, state}, payload = null) {
      // let query = []
      // payload && Object.keys(payload).map(el => {
      //   payload[el] && query.push(`${el}=${payload[el]}`)
      // })
      await axios.get('feeds', {
        params: {
          ...payload,
          offset: state.offset,
          item_per_page: state.itemPerPage,
        }
      }).then(async response => {
        commit('appendFeeds', response.data.data)
        commit('setTotalFeeds', response.data.total)
        commit('incrementOffset')
      }).catch(() => {
      })
    },
    async apiFeedsById({commit}, post_id) {
      await axios.get(`post/${post_id}`
      ).then(async response => {
        commit('setFeedsById', response.data)
      }).catch(() => {
      })
    },
    async actionsFeed({dispatch}, payload) {
      console.log("TCL: payload", payload)
      let url = payload.edit ? `post/${payload.post_id}` : `users/${payload.id}/wall`
      let method = payload.edit ? 'PUT' : 'POST'
      if (payload.publish_date) url += '?publish_date=' + payload.publish_date
      await axios({
        url,
        method,
        data: {
          title: payload.title,
          post_text: payload.post_text,
          tags: payload.tags
        }
      }).then(response => {
        if (payload.edit) {
          dispatch('users/info/apiWallById', payload.post_id, {
            root: true
          })
        } else {
          payload.route === 'News' ?
            dispatch('apiFeeds') :
            dispatch('users/info/apiWall', {
              id: payload.id
            }, {
              root: true
            })
        }
      }).catch(() => {
      })
    },
    async deleteFeeds({dispatch}, payload) {
      await axios.delete(`post/${payload.post_id}`
      ).then(async response => {
        payload.route === 'News' ?
          dispatch('apiFeeds') :
          dispatch('users/info/apiWall', {
            id: payload.id
          }, {
            root: true
          })
      }).catch(() => {
      })
    }
  }
}
