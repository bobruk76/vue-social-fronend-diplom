import axios from 'axios'

const statisticsText = category => {
  switch (category) {
    case 'comments_count':
      return 'Комментариев оставлено'
    case 'likes_count':
      return 'Лайков поставлено'
    case 'posts_count':
      return 'Публикаций создано'
    case 'users_count':
      return 'Пользователей зарегестрировано'
  }
};

const svgFilePath = type => `/static/img/statistics/${type.replace('_', '-')}.svg`;

export default {
  namespaced: true,
  state: {
    statistics: [],
    categoryStatistic: null,
  },
  getters: {
    getCategoryStatistic: s => s.categoryStatistic,
    getStatistics: s => s.statistics,
  },
  mutations: {
    setStatistics: (s, payload) => s.statistics = Object.entries(payload).map(([key, value]) => ({
      title: statisticsText(key),
      count: value,
      path: svgFilePath(key)
    })),
    setCategoryStatistic: (s, payload) => s.categoryStatistic = payload,
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

    async apiCategoryStatistic({state, commit}, category) {
      commit('setCategoryStatistic', null)
      await axios.get(`stat/${category}`)
        .then(response => {
          const responseData = response.data
          const result = {
            count: responseData[`${category}_count`],
            svgFilePath: svgFilePath(`${category}_count`),
            lineData: {
              labels: [],
              datasets: [
                {
                  label: 'Динамика прироста',
                  backgroundColor: [],
                  borderColor: category ==='users' ? '#fff' : 'green',
                  fill: false,
                  tension: 0.2,
                  data: [],
                },
              ]
            },
            barData: {
              labels: [],
              datasets: [
                {
                  label: statisticsText(`${category}_count`),
                  backgroundColor: [],
                  data: [],
                },
              ]
            }
          }
          if (category === 'users') {
            let count = 0
            Object.entries(responseData.yearsUsersStat).map(([key, value]) => {
              result.lineData.labels.push(key)
              result.lineData.datasets[0].data.push(value)
              count += value
              result.lineData.datasets[0].backgroundColor.push("#" + ((1 << 24) * Math.random() | 0).toString(16))
            })
            result.lineData.datasets[0].data = result.lineData.datasets[0].data.map(el => (100 * el / count).toFixed(3))
          } else {
            Object.entries(responseData[`${category}`]).map(([key, value]) => {
              result.lineData.labels.push(key)
              result.lineData.datasets[0].data.push(value)
              result.lineData.datasets[0].backgroundColor.push("#" + ((1 << 24) * Math.random() | 0).toString(16))
            })
          }
          Object.entries(responseData[(category === 'users') ? 'dynamic' : `${category}_by_hour`])
            .map(([key, value]) => {
              result.barData.labels.push(key)
              result.barData.datasets[0].data.push(value)
              result.barData.datasets[0].backgroundColor.push("#" + ((1 << 24) * Math.random() | 0).toString(16))
            })

          commit('setCategoryStatistic', result)
        }).catch(async error => {
          commit('setCategoryStatistic', null)
          await Promise.reject(error)
        })
    },
  }
}
