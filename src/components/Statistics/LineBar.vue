<template lang="pug">
  .posts-main
    .posts-main__header
      .posts-main__header-discr {{ titleData.count | numberFormat }}
      .posts-main__header-title {{ titleData.title }}
      .posts-main__header-img
        simple-svg.posts-main__header-img-svg(:filepath="titleData.img")
    template
      h3.posts-main__line-title {{ lineData.datasets[0].label}}
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
import StatisticsLine from '@/components/Statistics/Line'
import StatisticsBar from '@/components/Statistics/Bar'
import numberFormat from '@/helpers/numberFormat';
export default {
  name: 'LineBar',
  props: ['titleData', 'lineData', 'barData'],
  components: {StatisticsLine, StatisticsBar},
  filters: { numberFormat },
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
    //background-image url('/static/img/statistics/posts-count.svg')
    //background-position: left center;
    //background-repeat: no-repeat;
    margin-bottom 20px
    color #fff
    &-img
      display block
      align-items: center;
      justify-content: center;
      width 10%
      max-width 100px
      aspect-ratio 1



    &-title
      font-size 20px
      padding-right 20px

    &-discr
      font-weight 600
      font-size 39px
      padding-right 20px

  &__line
    margin-bottom 20px
    &-title
      font-weight 700
      font-size 20px
</style>
