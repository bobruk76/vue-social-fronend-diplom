<template lang="pug">
  .card
    simple-svg(:filepath="'/static/img/link.svg'")

</template>

<script>
export default {
  name: "Card",
  props: ['statistic', ],
  data: () => {

  },
  computed: {
    fileSvgName() {
      return this.statistic
    },
    filepath() {
      return `/static/img/statistics/${this.fileSvgName}.svg`
    },
  }
}
</script>

<style lang="stylus">
.card
  display flex
  flex-direction row
  min-width 518px
  min-height 150px
  background-color #fff

  .card__img
    height 100%
    width calc(100vh)
    background-color #21A45D

</style>
