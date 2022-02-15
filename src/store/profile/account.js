import axios from 'axios'

export default {
  namespaced: true,
  state: {
    notifications: [
      {
        icon: 'comments',
        name: 'О новых комментариях к моим публикациям',
        type: 'POST_COMMENT',
        enable: false
      },
      {
        icon: 'reviews',
        name: 'О ответах на мои комментарии',
        type: 'COMMENT_COMMENT',
        enable: false
      },
      {
        icon: 'friends',
        name: 'О заявках в дузья',
        type: 'FRIEND_REQUEST',
        enable: false
      },
      {
        icon: 'messages',
        name: 'О новых личных сообщениях',
        type: 'MESSAGE',
        enable: false
      },
      {
        icon: 'birthdays',
        name: 'О дне рождения друга',
        type: 'FRIEND_BIRTHDAY',
        enable: false
      }
    ],
  },
  getters: {
    getNotificationsSettings: s => s.notifications
  },
  mutations: {
    setNotificationsSettings: (s, notifications) =>
      s.notifications.map(el =>
        el.enable = notifications.find(n => n.notification_type === el.type).enable)
  },
  actions: {
    async passwordRecovery({dispatch}, email) {
      await axios.put('account/password/recovery', email)
        .then(async response => {
        })
        .catch(async error => {
          dispatch('global/alert/setAlert', {
            status: 'error',
            text: 'Что-то пошло те так!(('
          }, {
            root: true
          })
          await Promise.reject(error)
        })
    },
    async passwordSet({rootState}, password) {
      await axios.put('account/password/set', {
        token: rootState.auth.api.token,
        password
      }).then(async response => {
      }).catch(async error => {
        await Promise.reject(error)
      })
    },
    async prePasswordRecovery(payload) {
      await axios.get('send_recovery_massage', {
        params: {
          email: payload.email,
          code: payload.code,
        }
      }).then(async response => {
        console.log(response)
      }).catch(async error => {
        await Promise.reject(error)
      })
    },
    async passwordRecoverySet({dispatch}, payload) {
      dispatch('prePasswordRecovery', payload)
        .then(
          await axios.get('account/password/recovery/complete',
            {
              params: {
                email: payload.email,
                password: payload.password,
              }
            })
            .then(async response => {
              console.log(response)
            })
            .catch(async error => {
              dispatch('global/alert/setAlert', {
                status: 'error',
                text: 'Восстановить пароль не удалось! Попробуйте позже.'
              }, {
                root: true
              })
              await Promise.reject(error)
            })
        )
        .catch(async error => {
          await Promise.reject(error)
        })
    },

    async changeEmail({dispatch}, email) {
      await axios.put('account/email', email)
        .then(async response => {
        })
        .catch(async error => {
          dispatch('global/alert/setAlert', {
            status: 'error',
            text: 'Изменить почту не удалось!'
          }, {
            root: true
          })
          await Promise.reject(error)
        })
    },
    changeNotifications({dispatch}, data) {
      axios.put('account/notifications', data)
        .then(async response => {
          dispatch('global/alert/setAlert', {
            status: 'success',
            text: 'Настройки уведомлений изменены'
          }, {
            root: true
          })
        })
        .catch(async error => {
          await Promise.reject(error)
        })
        .then(() => {
          dispatch('apiNotificationsSettings')
        })
    },
    async apiNotificationsSettings({commit}) {
      await axios.get('account/notifications'
      ).then(async response => {
        console.log(response.data.data)
        commit('setNotificationsSettings', response.data.data)
      }).catch(async error => {
        await Promise.reject(error)
      })
    }
  }
}
