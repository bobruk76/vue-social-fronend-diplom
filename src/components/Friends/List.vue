<template lang="pug">
  .friends
    .friends__header
      h2.friends__title {{ getTitleById(typeList) }} ({{ getTotalById(typeList) }})
        a.friends__title_more(href="#" @click.prevent="setIsShowAll(typeList)" v-if="getTotalById(typeList)>0")
          template(v-if="getIsShowAll(typeList)") скрыть
          template(v-else) показать
      slot(name="search")
    .friends__list
      friends-block(
        :requests-out="typeList==='requestsOut'"
        :friend="typeList==='friend'"
        :blocked="typeList==='blocked'"
        :requests-in="typeList==='requestsIn'"
        :subscriptions="typeList==='subscriptions'"
        v-for="(friend,index) in getResultById(typeList)"
        :key="friend.id"
        :info="friend"
        v-show="getIsShowAll(typeList)"
      )
      .friends-block(v-show="(getOffsetById(typeList)!=0) || showNextById(typeList) && getIsShowAll(typeList)")
        a.friends__list_more.friends__list_more_arrow_left(href="#" @click.prevent="apiFetchList({deltaPage: -1, typeList})" v-show="getOffsetById(typeList)!=0")
        a.friends__list_more.friends__list_more_arrow_right(href="#" @click.prevent="apiFetchList({deltaPage: 1, typeList})" v-show="showNextById(typeList)" )

</template>

<script>
import FriendsBlock from '@/components/Friends/Block'
import {mapActions, mapGetters, mapMutations} from "vuex"

export default {
  name: "List",
  props: {
    typeList: '',
  },
  components: {FriendsBlock},
  computed: {
    ...mapGetters('profile/friends', ['getTitleById', 'getIsShowAll', 'showNextById', 'getTotalById', 'getResultById', 'getOffsetById', 'getFriendsPerPage']),
  },
  methods: {
    ...mapActions('profile/friends', ['apiFetchList']),
    ...mapMutations('profile/friends', ['setIsShowAll']),
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
    display flex
    flex-wrap wrap
    &_more
      &_arrow_right
        width 65px
        height 65px
        background url('/static/img/arrow-r.png') center no-repeat
        background-size 65px
      &_arrow_left
        width 65px
        height 65px
        background url('/static/img/arrow-l.png') center no-repeat
        background-size 65px

  &-block
    justify-content space-evenly
</style>
