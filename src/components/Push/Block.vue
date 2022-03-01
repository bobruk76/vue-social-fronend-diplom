<template lang="pug">
  .push-block
    .push__img
      img(:src="fetchUserInfo(info.id).photo" :alt="fetchUserInfo(info.id).first_name")
      //img(:src="info.photo" :alt="info.entity_author.first_name")
    p.push__content
      router-link.push__content-name(:to="getRouteByNotification(info)")
        | {{fetchUserInfo(info.id).first_name + ' ' + fetchUserInfo(info.id).last_name}}
        |
        | {{info.notificationsTextType}}
      span.push__content-preview «{{info.info}}»
    span.push__time {{info.sent_time | moment('from')}}
</template>

<script>
import {mapGetters} from 'vuex'
import {getRouteByNotification} from '@/utils/notifications.utils.js'

export default {
  name: 'PushBlock',
  props: {
    info: Object
  },
  computed: {
        ...mapGetters('users/info', ['getUsersList']),
    // ...mapGetters('profile/notifications', ['getNotificationsTextType'])
  },
  methods: {
    getRouteByNotification,
    fetchUserInfo(id) {
      return this.getUsersList.filter(el => el.id === id)[0] || {}
    },
  }
}
</script>

<style lang="stylus">
.push-block {
  background: #fff;
  padding: 25px 30px;
  box-shadow: 0px 2px 60px rgba(0, 0, 0, 0.1);
  display: flex;

  & + & {
    margin-top: 20px;
  }

  .push__img {
    flex: none;
  }

  .push__content {
    max-width: 650px;
    padding-top: 10px;
  }

  .push__time {
    flex: none;
    padding-top: 20px;
  }
}
</style>
