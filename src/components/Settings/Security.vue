<template lang="pug">
  .settings-security
    .settings-security__block
      h3.settings-security__title E-mail:
      span.settings-security__value {{getInfo.email}}
      button-hover(@click.native="onEmailChange") Изменить
    .settings-security__block
      h3.settings-security__title Пароль:
      span.settings-security__value ********
      button-hover(@click.native="onChangePassword") Изменить
    //modal(v-model="modalShow")
    //  p(v-if="modalText") {{modalText}}
    //  template(slot="actions")
    //    button-hover(@click.native="onConfirm") Ок
</template>

<script>
// import Modal from '@/components/Modal'
import {mapActions, mapGetters} from 'vuex'

export default {
  name: 'SettingsSecurity',
  // components: {Modal},
  // data: () => ({
  //   modalType: 'email',
  //   modalShow: false,
  // }),
  computed: {
    ...mapGetters('profile/info', ['getInfo']),
    // modalText() {
    //   switch (this.modalType) {
    //     case 'email':
    //       return `На ваш E-mail было отправлено письмо с подтверждением смены.`;
    //     case 'password':
    //       return `На ваш E-mail было отправлено письмо с ссылкой для смены пароля.`;
    //     default:
    //       return 'Ваше действие пока в нашей системе выполнить нельзя.';
    //   }
    // }
  },
  methods: {
    onEmailChange() {
      this.$router.push({name: 'ChangeEmail'});
    },
    onChangePassword() {
      this.$router.push({name: 'ChangePassword'});
    },
    // openModal(id) {
    //   this.modalType = id
    //   this.modalShow = true
    // },
    // closeModal() {
    //   this.modalShow = false
    // },
    // onConfirm() {
    //   switch (this.modalType) {
    //     case 'password':
    //       this.passwordRecovery({email: this.getInfo.email});
    //       break;
    //     default:
    //       console.error('Эта функция пока не реализованна!!!')
    //   }
    //   this.closeModal();
    // },
  }
}
</script>

<style lang="stylus">
@import '../../assets/stylus/base/vars.styl';

.settings-security__block
  background #fff
  box-shadow standart-boxshadow
  display flex
  align-items center
  height 95px
  padding 0 33px 0 50px
  font-size 15px

  & + &
    margin-top 20px

.settings-security__title
  color #5F5E7A
  width 100px

.settings-security__value
  color #414141
  display block
  margin-right auto

</style>
