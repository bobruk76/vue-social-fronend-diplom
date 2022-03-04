import axios from 'axios'

const notificationsTextType = type => {
  switch (type) {
    case 'POST':
      return 'опубликовал новую запись'
    case 'POST_COMMENT':
      return 'оставил комментарий'
    case 'COMMENT_COMMENT':
      return 'ответил на ваш комментарий'
    case 'FRIEND_REQUEST':
      return 'добавил в друзья нового пользователя'
    case 'FRIEND_BIRTHDAY':
      return 'день рождение'
    case 'MESSAGE':
      return 'прислал сообщение'
  }
}

export default {
  namespaced: true,
  state: {
    notifications: []
  },
  getters: {
    getNotifications: s => s.notifications || [],
    getNotificationsGroup: s => {
      const result = s.notifications.reduce((r, el) => {
        r[el.type] = (r[el.type] || 0) + 1
        return r
      }, {})
      return result
    },
    getNotificationsLength: s => s.notifications.length,
  },
  mutations: {
    setNotifications: (s, value) => s.notifications = value
  },
  actions: {
    async apiNotifications({commit, dispatch, rootGetters}) {
      await axios.get('notifications')
        .then(response => {
          // if (`${response.data.data.map(z => z.sent_time)}` !== `${state.notifications.map(z => z.sent_time)}`) {
          let result = response.data.data.map((item) => {
            if (!rootGetters['users/info/getUsersList'].map(el => el.id).includes(item.id)) {
              dispatch('users/info/apiInfo', item.id, {root: true})
            }
            return {
              ...item,
              notificationsTextType: notificationsTextType(item.type),
            } || {}
          })
          commit('setNotifications', result)
        })
        .catch(async error => {
          await Promise.reject(error)
        })
    },
    async readNotifications() {
      await axios.put('notifications?all=true', {
        all: true
      }).then(async response => {
      }).catch(async error => {
        await Promise.reject(error)
      })
    }
  }
}
