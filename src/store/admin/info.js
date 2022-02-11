import axios from 'axios'
// import moment from 'moment'
// import router from '@/router'

export default {
  namespaced: true,
  state: {
    statistics: [],
    postsStatistic: {},
    usersStatistic: {},
    isDataLoad: false
  },
  getters: {
    getIsDataLoad: s => s.isDataLoad,
    getStatistics: s => s.statistics,
    getPostsStatistic: s => s.postsStatistic,
    getUsersStatistic: s => s.usersStatistic,
    getSvgFilePath: s => type => `/static/img/statistics/${type.replace('_', '-')}.svg`,
    getStatisticsText: s => type => {
      switch (type) {
        case 'comments_count':
          return 'Комментариев оставлено'
        case 'likes_count':
          return 'Лайков поставлено'
        case 'posts_count':
          return 'Публикаций создано'
        case 'users_count':
          return 'Пользователей зарегестрировано'
      }
    },
  },
  mutations: {
    setStatistics: (s, payload) => s.statistics = Object.entries(payload).map(([key, value]) => ({
      type: key,
      count: value,
    })),
    setPostsStatistic: (s, payload) => s.postsStatistic = payload,
    setUsersStatistic: (s, payload) => s.usersStatistic = payload,
    setIsDataLoad: (s, payload) => s.isDataLoad = payload,
  },
  actions: {
    async apiAllStatistics({commit}) {
      await axios.get(`stat/all`)
        .then(async response => {
          commit('setStatistics', response.data)
        }).catch(async error => {
          commit('setStatistics', [])
          await Promise.reject(error)
        })
    },
    async apiPostsStatistic({commit}) {
      await axios.get(`stat/posts`)
        .then(async response => {
          const result = {
            postsCount: response.data.posts_count,
            monthData: {
              labels: [],
              datasets: [
                {
                  label: 'Динамика прироста',
                  backgroundColor: [],
                  borderColor: 'green',
                  fill: false,
                  tension: 0.2,
                  data: [],
                }
              ]
            },
            hourData: {
              labels: [],
              datasets: [
                {
                  label: 'Время публикации (суточная диаграмма)',
                  backgroundColor: [],
                  data: [],
                }
              ]
            }
          }
          Object.entries(response.data.posts).map(([key, value]) => {
            result.monthData.labels.push(key)
            result.monthData.datasets[0].data.push(value)
            result.monthData.datasets[0].backgroundColor.push("#" + ((1 << 24) * Math.random() | 0).toString(16))
          })
          Object.entries(response.data.posts_by_hour).map(([key, value]) => {
            result.hourData.labels.push(key)
            result.hourData.datasets[0].data.push(value)
            result.hourData.datasets[0].backgroundColor.push("#" + ((1 << 24) * Math.random() | 0).toString(16))
          })
          commit('setPostsStatistic', result)
          commit('setIsDataLoad', true)
        }).catch(async error => {
          commit('setPostsStatistic', {})
          commit('setIsDataLoad', false)
          await Promise.reject(error)
        })
    },
    async apiUsersStatistic({commit}) {
      await axios.get(`stat/users`)
        .then(async response => {
          const result = {
            usersCount: response.data.users_count,
            dynamic: {
              labels: [],
              datasets: [
                {
                  label: 'Динамика прироста',
                  backgroundColor: [],
                  borderColor: 'green',
                  fill: false,
                  tension: 0.2,
                  data: [],
                }
              ]
            },
            // yearsUsersStat: {
            //   labels: [],
            //   datasets: [
            //     {
            //       label: 'Время публикации (суточная диаграмма)',
            //       backgroundColor: 'green',
            //       data: [],
            //     }
            //   ]
            // }
          }
          Object.entries(response.data.dynamic).map(([key, value]) => {
            result.dynamic.labels.push(key)
            result.dynamic.datasets[0].data.push(value)
            result.dynamic.datasets[0].backgroundColor.push("#" + ((1 << 24) * Math.random() | 0).toString(16))
          })
          // Object.entries(response.data.posts_by_hour).map(([key, value]) => {
          //   result.hourData.labels.push(key)
          //   result.hourData.datasets[0].data.push(value)
          // })
          commit('setUsersStatistic', result)
          commit('setIsDataLoad', true)
        }).catch(async error => {
          commit('setPostsStatistic', {})
          commit('setIsDataLoad', false)
          await Promise.reject(error)
        })
    },
  }
}
