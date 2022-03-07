<template lang="pug">
  .friends.inner-page
    .inner-page__main
      .friends__header
        h2.friends__title Мои друзья ({{ countFriends }})
          a.friends__title_more(href="#" @click.prevent="showFriends('allFriends')" v-if="countFriends>getFriendsPerPage" )
            template(v-if="isShow.allFriends") скрыть
            template(v-else) показать
        .friends__search
          .friends__search-icon
            simple-svg(:filepath="'/static/img/search.svg'")
          input.friends__search-input(placeholder="Начните вводить имя друга..." v-model="first_name")
      .friends__list
        friends-block(
          friend
          v-for="(friend,index) in friends"
          :key="friend.id"
          :info="friend"
          :blocked="false"
          v-show="(index < getFriendsPerPage) || isShow.allFriends"
        )

      .friends__header
        h2.friends__title Входящие заявки ({{ countRequestsIn }})
          a.friends__more(href="#" @click.prevent="showFriends('allRequestsIn')" v-if="countRequestsIn>0" )
            template(v-if="isShow.allRequestsIn") скрыть
            template(v-else) показать
      .friends__list
        friends-block(requests-in :friend="false" v-for="(friend,index) in requestsIn" :key="friend.id" :info="friend" v-show="isShow.allRequestsIn")

      .friends__header
        h2.friends__title Исходящие заявки ({{ getTotalById('requestsOut') }})
          a.friends__title_more(href="#" @click.prevent="showFriends('allRequestsOut')" v-if="getTotalById('requestsOut')>0")
            template(v-if="isShow.allRequestsOut") скрыть
            template(v-else) показать
      .friends__list
        friends-block(requests-out v-for="(friend,index) in getResultById('requestsOut')" :key="friend.id" :info="friend" v-show="isShow.allRequestsOut")
        .friends-block(v-show="isShow.allRequestsOut")
          a.friends__list_more(href="#" @click.prevent="apiRequestsOut(deltaPage=-1)" v-show="getOffsetById('requestsOut')!=0") <<
          a.friends__list_more(href="#" @click.prevent="apiRequestsOut(deltaPage=1)" v-show="showNextById('requestsOut')" ) >>

      .friends__header
        h2.friends__title Заблокированные пользователи ({{ countBlockedFriends }})
          a.friends__title_more(href="#" @click.prevent="showFriends('allBlockedFriends')" v-if="countBlockedFriends>0")
            template(v-if="isShow.allBlockedFriends") скрыть
            template(v-else) показать
      .friends__list
        friends-block(blocked v-for="(friend,index) in blockedFriends" :key="friend.id" :info="friend" v-show="isShow.allBlockedFriends")

      .friends__header
        h2.friends__title Подписки ({{ countSubscriptions }})
          a.friends__title_more(href="#" @click.prevent="showFriends('allSubscriptions')" v-if="countSubscriptions>0")
            template(v-if="isShow.allSubscriptions") скрыть
            template(v-else) показать
      .friends__list
        friends-block(subscriptions v-for="(friend,index) in subscriptions" :key="friend.id" :info="friend" v-show="isShow.allSubscriptions")

      .friends__header
        h2.friends__title Подписчики ({{ countSubscribers }})
          a.friends__title_more(href="#" @click.prevent="showFriends('allSubscribers')" v-if="countSubscribers>0")
            template(v-if="isShow.allSubscribers") скрыть
            template(v-else) показать
      .friends__list
        friends-block(v-for="(friend,index) in subscribers" :key="friend.id" :info="friend" v-show="isShow.allSubscribers")

    .inner-page__aside
      friends-possible
</template>

<script>
import {mapGetters, mapActions} from 'vuex'
import FriendsPossible from '@/components/Friends/Possible'
import FriendsBlock from '@/components/Friends/Block'

export default {
  name: 'Friends',
  components: {FriendsPossible, FriendsBlock},
  data: () => ({
    first_name: '',
    isShow: {
      allFriends: false,
      allBlockedFriends: false,
      allRequestsIn: false,
      allRequestsOut: false,
      allSubscriptions: false,
      allSubscribers: false,
    },
  }),
  computed: {
    ...mapGetters('profile/friends', ['showNextById', 'getTotalById', 'getResultById', 'getOffsetById', 'getFriendsPerPage', 'getState']),
    friends() {
      return this.first_name.length === 0
        ? this.getResultById('friends')
        : this.getResultById('friends').filter(
          el => el.first_name.toLowerCase().indexOf(this.first_name.toLowerCase()) !== -1
        )
    },
    countFriends() {
      return this.friends.length;
    },
    blockedFriends() {
      return this.getResultById('blocked')
    },
    countBlockedFriends() {
      return this.blockedFriends.length;
    },
    requestsIn() {
      return this.getResultById('requestsIn');
    },
    countRequestsIn() {
      return this.requestsIn.length;
    },


    subscriptions() {
      return this.getResultById('subscriptions');
    },
    countSubscriptions() {
      return this.subscriptions
        ? this.subscriptions.length
        : 0;
    },
    subscribers() {
      return this.getResultById('subscribers');
    },
    countSubscribers() {
      return this.subscribers
        ? this.subscribers.length
        : 0;
    },
  },
  methods: {
    ...mapActions('profile/friends', ['apiAllLists', 'apiFriends', 'apiRequestsOut']),
    showFriends(value) {
      this.isShow[value] = !this.isShow[value]
    }
  },
  beforeRouteEnter(to, from, next) {
    next(vm => {
      vm.apiAllLists()
    })
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
