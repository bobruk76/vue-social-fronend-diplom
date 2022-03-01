import axios from 'axios'
import moment from 'moment'
import router from '@/router'

export default {
  namespaced: true,
  state: {
    info: null,
    wall: [],
    users: null,
    usersList: [],
  },
  getters: {
    getInfo(state) {
      if (!state.info) return
      let result = {
        ...state.info
      }
      // если понадобиться то добавить склонение (для публикаций, но нужен или пол или отчество)
      // библиотека - petrovich
      result.fullName = result.first_name + ' ' + result.last_name
      result.ages = moment().diff(result.birth_date, 'years')
      result.is_onlined = moment().diff(moment(result.last_online_time), 'seconds') <= 60
      return result
    },
    getUsersInfo(state) {
      if (!state.users) return
      let result = {
        ...state.users
      }
      // если понадобиться то добавить склонение (для публикаций, но нужен или пол или отчество)
      // библиотека - petrovich
      result.fullName = result.first_name + ' ' + result.last_name
      result.ages = moment().diff(result.birth_date, 'years')
      result.is_onlined = moment().diff(moment(result.last_online_time), 'seconds') <= 60
      return result
    },
    getWall: s => s.wall,
    getWallPostedLength: s => s.wall.filter(el => el.type === 'POSTED').length,
    getWallQueuedLength: s => s.wall.filter(el => el.type === 'QUEUED').length,
    getUsersList: s => s.usersList
  },
  mutations: {
    addUserToList: (s, info) => {
      if (!s.usersList.map(el => el.id).includes(info.id)) {
        s.usersList.push(info)
      }
    },
    setInfo: (s, info) => s.info = info,
    setWall: (s, wall) => s.wall = wall,
    setWallById: (s, payload) => s.wall[s.wall.indexOf(s.wall.find(el => el.id === payload.id))] = payload.value,
    setCommentsById: (s, payload) => {
      s.wall[s.wall.indexOf(s.wall.find(el => el.id === payload.post_id))].comments = payload.value
      s.wall.push('dog-nail')
      s.wall.splice(-1, 1)
    },
    setUsersInfo: (s, info) => s.users = info
  },
  actions: {
    async apiInfo({commit}, id) {
      await axios.get(`users/${id}`)
        .then(async response => {
          commit('setInfo', response.data.data)
          commit('addUserToList', response.data.data)
        })
        .catch(() => {
        })
    },
    async apiWall({
                    commit
                  }, {id, offset, itemPerPage}) {
      console.log('fetch wall', id)
      await axios({
        url: `users/${id}/wall${offset ? '?offset=' + offset : ''}${itemPerPage ? '&itemPerPage=' + itemPerPage : ''}`,
        method: 'GET'
      }).then(response => {
        commit('setWall', response.data.data)
      }).catch(error => {
      })
    },
    async apiWallById({
                        commit
                      }, id) {
      await axios({
        url: `post/${id}`,
        method: 'GET'
      }).then(response => {
        commit('setWallById', {
          id,
          value: response.data.data
        })
      }).catch(() => {
      })
    },
    async apiCommentsById({
                            commit
                          }, id) {
      await axios({
        url: `post/${id}/comments`,
        method: 'GET'
      }).then(response => {
        commit('setCommentsById', response.data.data)
      }).catch(error => {
      })
    },
    async userInfoId({commit, dispatch}, id) {
      await axios.get(`users/${id}`)
        .then(async response => {
          await dispatch('apiWall', {id})
          commit('setUsersInfo', response.data.data)
        })
        .catch(() => {
        })
    }
  }
}
