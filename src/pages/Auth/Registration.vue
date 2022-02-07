<template lang="pug">
  .registration
    form.registration__form(@submit.prevent="submitHandler")
      .form__block
        h4.form__subtitle Аккаунт
        email-field(id="register-email" v-model="email" :v="$v.email" :class="{checked: $v.email.required && $v.email.email}")
        password-field(id="register-password" v-model="passwd1" :v="$v.passwd1" info registration :class="{checked: $v.passwd1.required && $v.passwd2.sameAsPassword && $v.passwd1.minLength}")
        password-repeat-field(id="register-repeat-password" v-model="passwd2" :v="$v.passwd2" :class="{checked: $v.passwd1.required && $v.passwd2.sameAsPassword && $v.passwd2.minLength}")
      .form__block
        h4.form__subtitle Личные данные
        name-field(id="register-firstName" v-model="firstName" :v="$v.firstName")
        name-field(id="register-lastName" v-model="lastName" :v="$v.lastName" label="Фамилия")
      .form__block
        h4.form__subtitle Введите код с картинки
        //span.form__code {{code}}
        //number-field(id="register-number" v-model="number" :v="$v.number" :class="{checked: $v.number.required && $v.number.isCode}")

        a(href="#" @click.prevent="loadCaptcha")
          img.form__code(:src="getCaptcha.image" alt="Captcha")
        captcha-field(
          id="register-captcha"
          v-model="captcha"
          :v="$v.captcha"
          label="Введите код с картинки"
        )

        confirm-field(id="register-confirm" v-model="confirm" :v="$v.confirm")
      .registration__action
        button-hover(tag="button" type="submit" variant="white") Зарегистрироваться
</template>

<script>
import {mapGetters, mapActions} from 'vuex'
import {required, email, minLength, sameAs, numeric} from 'vuelidate/lib/validators'
import PasswordField from '@/components/FormElements/PasswordField'
import PasswordRepeatField from '@/components/FormElements/PasswordRepeatField'
import EmailField from '@/components/FormElements/EmailField'
import NameField from '@/components/FormElements/NameField'
import NumberField from '@/components/FormElements/NumberField'
import CaptchaField from '@/components/FormElements/CaptchaField.vue'
import ConfirmField from '@/components/FormElements/ConfirmField'

export default {
  name: 'Registration',
  components: {
    PasswordField,
    EmailField,
    NameField,
    CaptchaField,
    NumberField,
    ConfirmField,
    PasswordRepeatField
  },
  data: () => ({
    email: '',
    passwd1: '',
    passwd2: '',
    firstName: '',
    lastName: '',
    confirm: false,
    captcha: '',
  }),
  computed: {
    ...mapGetters(['getCaptcha']),
    ...mapGetters('auth/api', ['authStatus', 'getFormErrors',])
  },
  methods: {
    ...mapActions('auth/api', ['register']),
    ...mapActions(['loadCaptcha']),
    submitHandler() {
      if (this.$v.$invalid) {
        this.$v.$touch()
        return
      }
      const {email, passwd1, passwd2, firstName, lastName, captcha} = this
      this.register({
        email,
        passwd1,
        passwd2,
        firstName,
        lastName,
        captcha,
        captcha_secret: this.getCaptcha.secret_code
      }).then(() => {
        if (this.authStatus === 'success') {
          this.$router.push({name: 'RegisterSuccess'})
        }
      })
    }
  },
  mounted() {
    this.loadCaptcha();
  },
  validations: {
    confirm: {sameAs: sameAs(() => true)},
    email: {required, email},
    passwd1: {required, minLength: minLength(8)},
    passwd2: {required, minLength: minLength(8), sameAsPassword: sameAs('passwd1')},
    firstName: {required, minLength: minLength(3)},
    lastName: {required, minLength: minLength(3)},
    captcha: {
      required,
      serverOk: function () {
        return !this.getFormErrors.captcha
      }
    },
  },
}
</script>

<style lang="stylus">
@import '../../assets/stylus/base/vars.styl';

.registration
  min-height 100%
  display flex
  flex-direction column
  justify-content center

</style>
