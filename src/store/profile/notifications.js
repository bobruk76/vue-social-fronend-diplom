import axios from 'axios'

export default {
  namespaced: true,
  state: {
    notifications: []
  },
  getters: {
    getNotifications: s => s.notifications,
    getNotificationsLength: s => s.notifications.length,
    getNotificationsTextType: s => type => {
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
  },
  mutations: {
    setNotifications: (s, value) => s.notifications = value
  },
  actions: {
    async apiNotifications({
                             commit,
                             dispatch
                           }) {
      await axios.get('notifications')
        .then(async response => {
          console.log(response.data)
          if (`${response.data.data.map(z => z.sent_time)}` !== `${state.notifications.map(z => z.sent_time)}`) {
            commit('setNotifications', response.data.data)
          }
          // добавить когда будет прод
          // setTimeout(() => {
          //   dispatch('apiNotifications')
          // }, 5000)
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
