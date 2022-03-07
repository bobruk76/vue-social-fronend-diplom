<template lang="pug">
  .friends.inner-page
    .inner-page__main
      friends-list(typeList="friends")
        template(slot="search")
          .friends__search
            .friends__search-icon
              simple-svg(:filepath="'/static/img/search.svg'")
            input.friends__search-input(placeholder="Начните вводить имя друга..." v-model="first_name")

      friends-list(typeList="requestsIn")

      friends-list(typeList="requestsOut")

      friends-list(typeList="blocked")

      friends-list(typeList="subscriptions")

      friends-list(typeList="subscribers")

    .inner-page__aside
      friends-possible
</template>

<script>
import {mapGetters, mapActions, mapMutations} from 'vuex'
import FriendsPossible from '@/components/Friends/Possible'
import FriendsList from '@/components/Friends/List'

export default {
  name: 'Friends',
  components: {FriendsPossible, FriendsList},
  data: () => ({
    first_name: '',
    isShow: {
      allFriends: false,
    },
  }),
  computed: {
    ...mapGetters('profile/friends', ['getTitleById', 'getIsShowAll' ,'showNextById', 'getTotalById', 'getResultById', 'getOffsetById', 'getFriendsPerPage']),
  },
  methods: {
    ...mapActions('profile/friends', ['apiAllLists', 'apiFriends', 'apiFetchList']),
    ...mapMutations('profile/friends', ['setIsShowAll']),
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
