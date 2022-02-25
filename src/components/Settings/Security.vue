<template lang="pug">
  .settings-security
    .settings-security_block
      h3.settings-security_block-title E-mail:
      span.settings-security_block-value(v-if="getEmail") {{getEmail}}
      a.settings-security_block-link(href="#" @click.prevent="apiFetchEmail" v-else) Показать
      button-hover(@click.native="onEmailChange") Изменить
    .settings-security_block
      h3.settings-security_block-title Пароль:
      span.settings-security_block-value ********
      button-hover(@click.native="onChangePassword") Изменить
</template>

<script>
import {mapActions, mapGetters} from 'vuex'

export default {
  name: 'SettingsSecurity',
  computed: {
    ...mapGetters('profile/info', ['getInfo', 'getEmail']),
  },
  methods: {
    ...mapActions('profile/info', ['apiFetchEmail']),
    onEmailChange() {
      this.$router.push({name: 'ChangeEmail'});
    },
    onChangePassword() {
      this.$router.push({name: 'ChangePassword'});
    },
  }
}
</script>

<style lang="stylus">
@import '../../assets/stylus/base/vars.styl';

.settings-security
  &_block
    background #fff
    box-shadow standart-boxshadow
    display flex
    align-items center
    height 95px
    padding 0 33px 0 50px
    font-size 15px

    &-link
      display block
      margin-right auto
      color eucalypt

    & + &
      margin-top 20px

    &-title
      color #5F5E7A
      width 100px

    &-value
      color #414141
      display block
      margin-right auto

</style>
