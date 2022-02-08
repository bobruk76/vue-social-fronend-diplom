<template lang="pug">
  .change-email-success
    simple-svg(:filepath="'/static/img/success-change-email.svg'")
</template>

<script>
export default {
  name: 'ChangeEmailSuccess'
}
</script>

<style lang="stylus">
.change-email-success
  height 100%
  display flex
  justify-content center
  align-items center

  .simple-svg-wrapper
    width: 90px
</style>
