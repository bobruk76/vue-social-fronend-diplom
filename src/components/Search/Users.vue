<template lang="pug">
  .search-users
    search-block(title="Люди", id="users")
      .friends__list
        friends-block(v-for="user in users" :key="user.id" :info="user")
        a.friends-block.friends__list_more(href="#" @click.prevent="searchUsers" v-show="getIsShowMore") показать еще...
</template>

<script>
import {mapActions, mapGetters, mapMutations} from 'vuex'
import SearchBlock from '@/components/Search/Block'
import FriendsBlock from '@/components/Friends/Block'

export default {
  name: 'SearchUsers',
  components: {SearchBlock, FriendsBlock},
  methods: {
    ...mapActions('global/search', ['searchUsers']),
  },
  computed: {
    ...mapGetters('global/search', ['getResultById', 'getIsShowMoreById']),
    getIsShowMore() {
      return this.getIsShowMoreById('users')
    },
    users() {
      return this.getResultById('users')
    },
  },
}
</script>
<style lang="stylus">
.friends__list_more
  font-size 20px
  font-weight normal
  color eucalypt
</style>
