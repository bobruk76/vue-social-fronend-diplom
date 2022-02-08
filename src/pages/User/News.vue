<template lang="pug">
  .news.inner-page
    .inner-page__main
      .news__add
        news-add(user)
      .news__list(v-if="getInfo")
        news-block(
          v-for="feed in getFeeds"
          :key="feed.id"
          :info="feed"
          :edit="getInfo.id === feed.author.id"
          :deleted="getInfo.id === feed.author.id"
        )
      .news-block()
        a.news-block__more(href="#" @click.prevent="apiFeeds" v-show="getIsShowMore") показать еще...
    .inner-page__aside
      friends-possible
 </template>

<script>
import {mapGetters, mapActions, mapMutations} from 'vuex'
import FriendsPossible from '@/components/Friends/Possible'
import NewsBlock from '@/components/News/Block'
import NewsAdd from '@/components/News/Add'
export default {
  name: 'News',
  components: { FriendsPossible, NewsBlock, NewsAdd },
  computed: {
    ...mapGetters('profile/feeds', ['getFeeds', 'getIsShowMore']),
    ...mapGetters('profile/info', ['getInfo']),
  },
  methods: {
    ...mapActions('profile/feeds', ['apiFeeds']),
    ...mapMutations('profile/feeds', ['setDefaultState']),
  },
  beforeRouteEnter(to, from, next) {
    next(vm => {
      vm.setDefaultState()
      vm.apiFeeds()
    })
  }
}
</script>

<style lang="stylus">
@import '../../assets/stylus/base/vars.styl';

.news__add
  margin-bottom 30px

.news-block__more
  font-size 20px
  font-weight normal
  color eucalypt
</style>
