<template lang="pug">
  .stats-main
    .stats-main__header
      .stats-main__header-img
        simple-svg.stats-main__header-img-svg(:filepath="titleData.img")
      .stats-main__header-content
        .stats-main__header-content-discr {{ titleData.count | numberFormat }}
        .stats-main__header-content-title {{ titleData.title }}

    template(v-if='category!=="users"')
      h3.stats-main__line-title {{ lineData.datasets[0].label}}
      statistics-line.stats-main__line(
        :chart-data="lineData"
        :options="options"
        :styles="lineStyles"
      )
    statistics-bar.stats-main__line(
      :chart-data="barData"
      :options="options"
      :styles="lineStyles"
    )
    .stats-main__doughnut(v-if='category==="users"')
      h3.stats-main__doughnut-title Распределение по возрасту
      statistics-doughnut(
        :chart-data="lineData"
        :options="options"
        :styles="lineStyles"
      )
</template>

<script>
import StatisticsLine from '@/components/Statistics/Line'
import StatisticsBar from '@/components/Statistics/Bar'
import StatisticsDoughnut from '@/components/Statistics/Doughnut'
import numberFormat from '@/helpers/numberFormat';

export default {
  name: 'LineBar',
  props: ['category', 'titleData', 'lineData', 'barData'],
  components: {StatisticsLine, StatisticsBar, StatisticsDoughnut},
  filters: {numberFormat},
  data: () => ({
    options: {
      responsive: true,
      maintainAspectRatio: false
    },
    lineStyles: {
      width: '100%',
      'max-height': '300px',
      position: 'relative'
    }
  }),
  computed: {},
}
</script>

<style lang="stylus">
@import '../../assets/stylus/base/vars.styl'

.stats-main
  font-family 'Open Sans'
  display flex
  flex-wrap wrap
  justify-content left
  position relative
  background-color #fff
  width 100%
  padding 0 20px

  &__doughnut
    width 50%

    &-title
      font-weight 700
      font-size 20px

  &__header
    display flex
    flex-direction row
    justify-content space-between
    align-items center
    width 100%
    height h = calc(100vh / 4)
    max-height 100px
    background-color eucalypt
    margin-bottom 20px
    color #fff

    &-img
      display block
      align-items bottom
      justify-content bottom
      width 20%
      max-width 100px
      aspect-ratio 1
      padding-left 20px

    &-content
      display flex
      flex-direction row-reverse
      align-items center

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
