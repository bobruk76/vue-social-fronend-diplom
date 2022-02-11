import axios from 'axios'
// import moment from 'moment'
// import router from '@/router'

export default {
  namespaced: true,
  state: {
    statistics: [],
    postsStatistic: {},
    isDataLoad: false
  },
  getters: {
    getIsDataLoad: s => s.isDataLoad,
    getStatistics: s => s.statistics,
    getPostsStatistic: s => s.postsStatistic,
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
    // getChartData(s) {
    //   let labels = []
    //   let data = []
    //   Object.entries(s.postsStatistic.posts).map(([key, value]) => {
    //     labels.push(key)
    //     data.push(value)
    //   })
    //   return {
    //     labels: labels,
    //     datasets: [
    //       {
    //         label: 'Данные 1',
    //         backgroundColor: '#f87979',
    //         data: data,
    //       }
    //     ]
    //   }
    // },
  },
  mutations: {
    setStatistics: (s, payload) => s.statistics = Object.entries(payload).map(([key, value]) => ({
      type: key,
      count: value,
    })),
    setPostsStatistic: (s, payload) => s.postsStatistic = payload,
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
            monthData: {
              labels: [],
              datasets: [
                {
                  label: 'Динамика прироста',
                  backgroundColor: 'green',
                  data: [],
                }
              ]
            },
            hourData: {
              labels: [],
              datasets: [
                {
                  label: 'Время публикации (суточная диаграмма)',
                  backgroundColor: 'green',
                  data: [],
                }
              ]
            }
          }
          console.log(result)
          Object.entries(response.data.posts).map(([key, value]) => {
            result.monthData.labels.push(key)
            result.monthData.datasets[0].data.push(value)
          })
          Object.entries(response.data.posts_by_hour).map(([key, value]) => {
            result.hourData.labels.push(key)
            result.hourData.datasets[0].data.push(value)
          })
          commit('setPostsStatistic', result)
          commit('setIsDataLoad', true)
        }).catch(async error => {
          commit('setPostsStatistic', {})
          commit('setIsDataLoad', false)
          await Promise.reject(error)
        })
    },
  }
}
