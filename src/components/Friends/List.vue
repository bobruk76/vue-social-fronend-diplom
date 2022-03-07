<template lang="pug">
  .friends__header
    h2.friends__title {{ getTitleById('requestsOut') }} ({{ getTotalById('requestsOut') }})
      a.friends__title_more(href="#" @click.prevent="showFriends('allRequestsOut')" v-if="getTotalById('requestsOut')>0")
        template(v-if="isShow.allRequestsOut") скрыть
        template(v-else) показать
  .friends__list
    friends-block(requests-out v-for="(friend,index) in getResultById('requestsOut')" :key="friend.id" :info="friend" v-show="isShow.allRequestsOut")
    .friends-block(v-show="isShow.allRequestsOut")
      a.friends__list_more(href="#" @click.prevent="apiFetchList({deltaPage: -1, typeList: 'requestsOut'})" v-show="getOffsetById('requestsOut')!=0") <<
      a.friends__list_more(href="#" @click.prevent="apiFetchList({deltaPage: 1, typeList: 'requestsOut'})" v-show="showNextById('requestsOut')" ) >>
</template>

<script>
import FriendsBlock from '@/components/Friends/Block'
import {mapActions, mapGetters} from "vuex"

export default {
  name: "List",
  components: {FriendsBlock},
  computed: {
    ...mapGetters('profile/friends', ['getTitleById', 'showNextById', 'getTotalById', 'getResultById', 'getOffsetById']),
  },
  methods: {
    ...mapActions('profile/friends', ['apiFetchList']),
  },
}
</script>
<style lang="stylus">
@import '../../assets/stylus/base/vars.styl'
.friends
  &__title
    &_more
      padding-left 10px
      font-size 20px
      font-weight normal
      color eucalypt

  &__list
    &_more
      font-size 50px
      color eucalypt

    .friends-block
      justify-content space-evenly
</style>
