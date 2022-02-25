import SockJS from 'sockjs-client'
import Stomp from 'stompjs'

const socket = new SockJS('http://localhost:8080/socket')
export default {
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
    send({state}, payload) {
      console.log("Send message:" + payload.message);
      if (state.stompClient && state.stompClient.connected) {
        const msg = {name: this.message};
        state.stompClient.send(`/topic/messages/${payload.id}`, JSON.stringify(msg), {});
      }
    },
  },

}
