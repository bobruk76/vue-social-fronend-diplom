<template lang="pug">
  .change-password
    h2.change-password__title.form__title Новый пароль
    form.change-password__form(@submit.prevent="submitHandler")
      password-field(id="change-password" v-model="password" :v="$v.password" info registration :class="{checked: $v.password.required && $v.passwordTwo.sameAsPassword}")
      password-repeat-field(id="change-repeat-password" v-model="passwordTwo" :v="$v.passwordTwo" :class="{checked: $v.password.required && $v.passwordTwo.sameAsPassword}")
      .change-password__action
        button-hover(tag="button" type="submit" variant="white") Отправить
</template>

<script>
import {required, sameAs, minLength} from 'vuelidate/lib/validators'
import PasswordField from '@/components/FormElements/PasswordField'
import PasswordRepeatField from '@/components/FormElements/PasswordRepeatField'
import {mapActions} from 'vuex'

export default {
  name: 'ChangePassword',
  components: {
    PasswordField,
    PasswordRepeatField
  },
  data: () => ({
    email: '',
    code: '',
    password: '',
    passwordTwo: ''
  }),
  methods: {
    ...mapActions('profile/account', ['passwordRecoverySet']),
    ...mapActions('auth/api', ['logout']),
    submitHandler() {
      if (this.$v.$invalid) {
        this.$v.$touch()
        return
      }

      this.passwordRecoverySet({
        password: this.passwordTwo,
        email: this.email,
        code: this.code,
      })
        .then(() => {
          this.logout()
          this.$router.push({name: 'ChangePasswordSuccess'})
        })
    }
  },
  validations: {
    password: {required, minLength: minLength(8)},
    passwordTwo: {required, minLength: minLength(8), sameAsPassword: sameAs('password')}
  },
  created() {
    this.code = this.$route.query.code
    this.email = this.$route.query.email
  },

}
</script>

<style lang="stylus">
.change-password {
  display: flex;
  justify-content: center;
  flex-direction: column;
  height: 100%;
}

.change-password__title {
  margin-bottom: 50px;
}

.change-password__action {
  margin-top: 50px;
}
</style>
