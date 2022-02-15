<template lang="pug">
  .shift-password-success
    simple-svg(:filepath="'/static/img/success-change-password.svg'")
</template>

<script>
export default {
  name: 'ShiftPasswordSuccess'
}
</script>

<style lang="stylus">
.shift-password-success
  height 100%
  display flex
  justify-content center
  align-items center

  .simple-svg-wrapper
    width 90px
</style>
