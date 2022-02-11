<template lang="pug">
  .posts-main
    .posts-main__header
      //span.posts-main__header-discr {{ getPostsStatistic.postsCount }}
      span.posts-main__header-title Публикаций за все время:

    statistics-line.posts-main__line(
      :chart-data="lineData"
      :options="options"
      :styles="lineStyles"
    )
    statistics-bar.posts-main__line(
      :chart-data="barData"
      :options="options"
      :styles="lineStyles"
    )
</template>

<script>
import {mapGetters, mapActions, mapMutations} from 'vuex'
import StatisticsLine from '@/components/Statistics/Line'
import StatisticsBar from '@/components/Statistics/Bar'

export default {
  name: 'LineBar',
  props: ['lineData', 'barData'],
  components: {StatisticsLine, StatisticsBar},
  data: () => ({
    options: {
      responsive: true,
      maintainAspectRatio: false
    }
  }),
  computed: {
    lineStyles() {
      return {
        width: '100%',
        'max-height': '300px',
        position: 'relative'
      }
    }
  },
}
</script>

<style lang="stylus">
@import '../../assets/stylus/base/vars.styl'

.posts-main
  font-family 'Open Sans'
  display flex
  flex-wrap wrap
  position relative
  background-color #fff
  width 100%
  padding 0 20px

  &__header
    display flex
    flex-direction row-reverse
    align-items center
    width 100%
    height h = calc(100vh / 4)
    max-height 100px
    background-color eucalypt
    background-image url('/static/img/statistics/posts-count.svg')
    background-position: left center;
    background-repeat: no-repeat;
    margin-bottom 20px
    color #fff

    &-title
      font-size 20px
      padding-right 20px

    &-discr
      font-weight 600
      font-size 39px
      padding-right 20px

  &__line
    margin-bottom 20px

</style>
