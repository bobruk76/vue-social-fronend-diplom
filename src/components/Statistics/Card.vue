<template lang="pug">
  .statistics-card-main
    .statistics-card-main__img
      simple-svg.statistics-card-main__img-svg(:filepath="getSvgFilePath(statistic.type)")
    .statistics-card-main__info
      h3.statistics-card-main__info-header {{ getStatisticsText(statistic.type) }}
      span.statistics-card-main__info-discr {{ statistic.count }}
</template>

<script>
import {mapGetters} from "vuex";

export default {
  name: 'StatisticsCard',
  props: {
    statistic: Object,
  },
  computed: {
    ...mapGetters('admin/info', ['getStatisticsText', 'getSvgFilePath']),
    filepath() {
      return `/static/img/statistics/${Object.keys(this.statistic)[0].replace('_', '-')}.svg`
    },
  }
}
</script>

<style lang="stylus">
@import '../../assets/stylus/base/vars.styl';
.statistics-card-main
  display grid
  grid-template-columns 1fr 2fr
  margin-bottom 20px
  width calc((100% / 2) - 20px)
  background-color #fff
  &:nth-child(2n-1)
    margin-right 20px
  &__img
    aspect-ratio 1
    background-color eucalypt
  &__info
    display flex
    flex-direction column
    justify-content center
    &-header
      padding-left 10px
      font-size 20px
    &-discr
      padding-left 10px
      font-size 54px
</style>
