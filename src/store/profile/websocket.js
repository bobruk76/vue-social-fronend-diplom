import axios from 'axios'
import SockJS from 'sockjs-client'
import Stomp from 'stompjs'

const socket = new SockJS('/socket')
export default {
  namespaced: true,
  state: {
    token: localStorage.getItem('user-token') || '',
    stompClient: '',
  },
  mutations: {
    setStompClient: (state, value) => state.stompClient = value
  },
  actions: {
    connection({commit}, payload) {
      commit('setStompClient', Stomp.overTCP(socket))
      const headers = {
        token: state.token,
      }
      state.stompClient.connect(headers, frame => {
        console.log('Connected: ' + frame);
        state.stompClient.subscribe(`/topic/messages/${payload.id}`, msg => {
          console.log(msg)
        }, headers)

        state.stompClient.subscribe('/user/topic/messages', msg => {
          msg.forEach(m => m(JSON.parse(message.body)))
        }, headers)

        state.stompClient.subscribe('/user/topic/unreaded', msg => {
          msg.forEach(m => m(JSON.parse(message.body)))
        }, headers)

        state.stompClient.subscribe('/user/topic/notifications', notification => {
          notification.forEach(m => m(JSON.parse(message.body)))
        }, headers)

      }, (error) => {
        console.log(error)
      })
    },
    send({state}, payload) {
      console.log("Send message:" + payload.message_text);
      if (state.stompClient && state.stompClient.connected) {
        const msg = {name: this.message_text};
        state.stompClient.send(`/topic/messages/${payload.id}`, JSON.stringify(msg), {});
      }
    },
  },

}
