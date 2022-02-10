import axios from 'axios'
import moment from 'moment'

export default {
  namespaced: true,
  state: {
    info: null,
    countries: [],
    cities: [],
  },
  getters: {
    getCountries: state => state.countries,
    getCities: state => state.cities,
    getInfo(state) {
      if (!state.info) return
      let result = {
        ...state.info
      }
      result.fullName = (result.first_name && result.last_name) ? `${result.first_name} ${result.last_name}` : '';
      result.ages = moment().diff(result.birth_date, 'years')
      return result
    }
  },
  mutations: {
    setInfo: (s, info) => s.info = info,
    setCountries: (state, value) => state.countries = value,
    setCities: (state, value) => state.cities = value,
  },
  actions: {
    async apiFetchCountries({commit}) {
      await axios.get('platform/countries')
        .then(async response => {
          commit('setCountries', response.data.data)
        })
        .catch(() => {
        })
    },
    async apiFetchCities({commit}, country) {
      commit('setCities', [])
      country && await axios.get('platform/cities',
        {
          params: {country}
        }).then(async response => {
        commit('setCities', response.data.data)
      }).catch(() => {})
    },
    async apiInfo({commit}) {
      await axios({
        url: 'users/me',
        method: 'GET'
      }).then(async response => {
        commit('setInfo', response.data.data)
      }).catch(() => {
      })
    },
    async apiChangeInfo({commit, dispatch}, user) {
      await axios.put('users/me', user)
        .then(async response => {
          dispatch('global/alert/setAlert', {
            status: 'success',
            text: 'Информация обновлена'
          }, {
            root: true
          })
          commit('setInfo', response.data.data)
        })
        .catch(async error => {
          console.error(error.response);
          dispatch('global/alert/setAlert', {
            status: 'error',
            text: 'Не удалось обновить информацию((('
          }, {
            root: true
          })
        })
    }
    ,
    async deleteInfo() {
      await axios({
        url: 'users/me',
        method: 'DELETE'
      }).then(() => {
      }).catch(() => {
      })
    }
  }
}
