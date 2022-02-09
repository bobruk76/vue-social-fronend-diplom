<template lang="pug">
  .statistics-main
    p(v-for="(item, index) in getStatistics" :key="index") {{ item }}
</template>

<script>
import {mapGetters, mapActions} from 'vuex'

export default {
  name: 'SettingsMain',
  computed: {
    ...mapGetters('admin/info',['getStatistics'])
  },
  methods: {
    ...mapActions('admin/info', ['apiAllStatistics']),
    showFriends(value) {
      this.isShow[value] = !this.isShow[value]
    }
  },
  beforeMount() {
    this.apiAllStatistics()
  },

}
</script>

<style lang="stylus">
@import '../../assets/stylus/base/vars.styl'
@import '../../assets/stylus/components/user-info-form.styl'

.statistics-main
  background #fff
  box-shadow standart-boxshadow
  padding 40px 10px 50px

  .statistics-main__header
    font-size 24px

  @media (max-width: breakpoint-xl)
    padding 40px 20px

.statistics-main__back
  margin-left 20px

</style>
