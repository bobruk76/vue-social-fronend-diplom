<template lang="pug">
  .form__group(:class="{fill: email.length > 0}")
    input.form__input(
      :id="id"
      v-model="email"
      name="email"
      :class="{invalid: (v.$dirty && !v.required) || (v.$dirty && !v.email) || (!v.serverOk && v.serverOk)}"
      @change="v.$touch()"
      )
    label.form__label(:for="id") {{placeholder}}
    span.form__error(v-if="v.$dirty && !v.required") Введите Email
    span.form__error(v-else-if="v.$dirty && !v.email") Введите корректный Email
    span.form__error(v-else-if="!v.serverOk && v.serverOk") Такой email уже зарегистрирован
</template>

<script>
import {mapMutations} from "vuex";

export default {
  name: 'EmailField',
  props: {
    value: {
      type: String,
      default: '',
    },
    v: {
      type: Object,
      required: true,
    },
    id: {
      type: String,
      required: true
    },
    placeholder: {
      type: String,
      default: 'E-mail'
    }
  },
  methods: {
    ...mapMutations('auth/api', ['setFormErrors']),
    onResetCaptchaError() {
      this.setFormErrors({name: 'email', value: false});
    }
  },
  computed: {
    email: {
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

