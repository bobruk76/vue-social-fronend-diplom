import axios from 'axios'
// import moment from 'moment'
// import router from '@/router'

export default {
  namespaced: true,
  state: {
    statistics: [],
  },
  getters: {
    getStatistics: s => s.statistics,
    getSvgFilePath: s => type => `/static/img/statistics/${type.replace('_','-')}.svg`,
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
    }
  },
  mutations: {
    setStatistics: (s, payload) => s.statistics = Object.entries(payload).map(([key, value]) => ({
      type: key,
      count: value,
    })),
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
  }
}
