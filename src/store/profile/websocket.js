import SockJS from 'sockjs-client'
import Stomp from 'stompjs'

const socket = new SockJS('http://localhost:8080/socket')
export default {
  state: {
    token: localStorage.getItem('user-token') || '',
    stompClient: '',
  },
  mutations: {
    setStompClient: (s, value) => s.stompClient = value,
  },
  actions: {
    connection({state, commit}, payload) {
      commit('setStompClient', Stomp.overTCP(socket))
      const headers = {
        Authorization: state.token,
      }
      state.stompClient.connect(headers, frame => {
        console.log('Connected: ' + frame);
        state.stompClient.subscribe(`/topic/messages/${payload.id}`, msg => {
          console.log(msg)
        }, headers)
      }, (error) => {
        console.log(error)
      })
    },
  },

}
