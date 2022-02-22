import axios from "axios";

export default {
  namespaced: true,
  state: {
    weather: null,
  },
  getters: {
    getWeather: s => s.weather,
  },
  mutations: {
    setWeather: (s, value) => s.weather = value,
  },
  actions: {
    async apiFetchWeather({commit, dispatch}) {
      await axios.get('platform/weather')
        .then(async response => {
          commit('setWeather', response.data)
        })
        .catch(async error => {
          return Promise.reject(error)
        })
        .then(() => {
          setTimeout(() => {
            dispatch('apiFetchWeather')
          }, 5000)
        })
    },
  }
}
