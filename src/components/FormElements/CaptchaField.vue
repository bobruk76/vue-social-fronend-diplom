<template lang="pug">
  .form__group(:class="{fill: captcha.length > 0}")
    input.form__input(
      :id="id"
      v-model="captcha"
      name="captcha"
      :class="{invalid: (v.$dirty && !v.required) || (!v.serverOk)}"
      @change="v.$touch()"
      @beforeinput="onResetCaptchaError")
    label.form__label(:for="id") {{label}}
    span.form__error(v-if="v.$dirty && !v.required") Обязательно поле
    span.form__error(v-else-if="!v.serverOk") Неверно введен код с картинки

</template>

<script>
import {mapMutations} from "vuex";

export default {
  name: 'CaptchaField',
  props: {
    value: {
      type: String,
      default: ''
    },
    v: {
      type: Object,
      required: true
    },
    label: {
      type: String,
      default: 'Имя'
    },
    id: {
      type: String,
      required: true
    },
  },
  methods: {
    ...mapMutations('auth/api', ['setFormErrors']),
    onResetCaptchaError() {
      this.setFormErrors({name: 'captcha', value: false});
    }
  },
  computed: {
    captcha: {
      get() {
        return this.value
      },
      set(value) {
        this.$emit('input', value)
      }
    }
  }
}
</script>

