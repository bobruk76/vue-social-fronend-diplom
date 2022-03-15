<script>
import {mapGetters, mapActions} from 'vuex'
import Stomp from "webstomp-client"
import SockJS from "sockjs-client"

// const INTERVAL_DIALOG_MS = 2000;
const INTERVAL_NOTIFICATIONS_MS = 10000;

export default {
  // computed: {
  //   ...mapGetters('profile/dialogs', ['activeDialog']),
  // },
  data: () => ({
    connected: false,
  }),
  methods: {
    // ...mapActions('profile/dialogs', ['loadFreshMessages']),
    ...mapActions('profile/notifications', ['apiNotifications']),
    websocketConnect() {
      this.socket = new SockJS(`https://zerone-2022-develop.herokuapp.com/api/v1/socket`)
      const token = localStorage.getItem('user-token')

      this.stompClient = Stomp.over(this.socket)

      this.stompClient.connect({token},
        frame => {
          this.connected = true
          // console.log('Connected: ' + frame)

          // this.stompClient.subscribe('/user/topic/messages', messages => {
          //   console.log('messages:',messages)
          //
          // })
          //
          // this.stompClient.subscribe('/user/topic/unreaded', unreaded => {
          //   console.log('unreaded:',unreaded)
          //
          // })

          this.stompClient.subscribe('/user/topic/notifications', notification => {
            console.log('notification:', notification)

          })

        },
        error => {
          console.log(error)
        })
    },
    websocketDisconnect() {
      if (this.stompClient) {
        this.stompClient.disconnect();
      }
      this.connected = false;
    },
  },
  mounted() {
    // this.intervalForMessages = setInterval(() => {
    //   if (this.activeDialog) {
    //     this.loadFreshMessages(this.activeDialog.id)
    //   }
    // }, INTERVAL_DIALOG_MS)

    this.intervalForNotifications = setInterval(() => {
      this.apiNotifications()
    }, INTERVAL_NOTIFICATIONS_MS)
    this.websocketConnect()
  },
  beforeDestroy() {
    // window.clearInterval(this.intervalForMessages);
    window.clearInterval(this.intervalForNotifications)
    this.websocketDisconnect()
  },
  render: () => null,
}
</script>
