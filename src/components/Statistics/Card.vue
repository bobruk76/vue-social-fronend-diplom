<template lang="pug">
  .statistics-card-main
    span {{ filepath }}
    //simple-svg.statistics-card-main__img(:filepath="filepath")

</template>

<script>
export default {
  name: 'StatisticsCard',
  props: ['statistic', ],
  data: () => {

  },
  computed: {
    filepath() {
      return `/static/img/statistics/${Object.keys(this.statistic)[0].replace('_','-')}.svg`
    },
  }
}
</script>

<style lang="stylus">
@import '../../assets/stylus/base/vars.styl';
.statistics-card-main
  display flex
  flex-direction row
  min-width 518px
  min-height 150px
  background-color #fff

  .statistics-card-main__img
    height 100%
    width calc(100vh)
    background-color #eucalypt

</style>
