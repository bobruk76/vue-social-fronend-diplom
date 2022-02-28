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
    getNotifications: s => s.notifications,
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
        .then(async response => {
          // if (`${response.data.data.map(z => z.sent_time)}` !== `${state.notifications.map(z => z.sent_time)}`) {
          const result = response.data.data.map((item) => {
            dispatch('users/info/apiInfo', item.id, {root: true})
            return {
              ...item,
              notificationsTextType: notificationsTextType(item.type),
              entity_author: rootGetters['users/info/getUserById'](item.id) || {},
            } || {}
          })
          commit('setNotifications', result)
        })
        .catch(() => {
        })
    },
    async readNotifications() {
      await axios.put('notifications?all=true')
        .then(async response => {
        })
        .catch(() => {
        })
    }
  }
}
