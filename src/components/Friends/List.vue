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
        a.friends__list_more(href="#" @click.prevent="apiFetchList({deltaPage: -1, typeList})" v-show="getOffsetById(typeList)!=0") <<
        a.friends__list_more(href="#" @click.prevent="apiFetchList({deltaPage: 1, typeList})" v-show="showNextById(typeList)" ) >>
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
    &_more
      font-size 50px
      color eucalypt

    .friends-block
      justify-content space-evenly
</style>
