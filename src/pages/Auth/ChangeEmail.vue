<template lang="pug">
  .change-email
    h2.change-email__title.form__title Смена почтового ящика
    form.change-email__form(@submit.prevent="submitHandler")
      email-field(id="register-email" v-model="email" :v="$v.email" :class="{checked: $v.email.required && $v.email.email}")
      .change-email__action
        button-hover(tag="button" type="submit" variant="white") Сменить
</template>

<script>
import {required, email} from 'vuelidate/lib/validators'
import EmailField from '@/components/FormElements/EmailField'
import {mapActions} from 'vuex'

export default {
  name: 'ChangeEmail',
  components: {
    EmailField,
  },
  data: () => ({
    email: '',
  }),
  methods: {
    ...mapActions('auth/api', ['logout']),
    ...mapActions('profile/account', ['changeEmail']),
    submitHandler() {
      if (this.$v.$invalid) {
        this.$v.$touch()
        return
      }

      this.changeEmail({email: this.email})
        .then(() => {
          this.logout()
          this.$router.push({name: 'ShiftEmailSuccess'})
        })
        .catch(error => {
          console.error(error)
        })
    }
  },
  validations: {
    email: {
      required,
      email,
      serverOk: () => true,
    }
  }
}
</script>

<style lang="stylus">
.change-email
  display flex
  justify-content center
  flex-direction column
  height 100%

.change-email__title
  margin-bottom 50px

.change-email__action
  margin-top 50px

</style>
