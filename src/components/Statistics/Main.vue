<template lang="pug">
  .statistics-main
    statistics-card(v-for="(item, index) in getStatistics" :key="index" :statistic="item")
</template>

<script>
import {mapGetters, mapActions} from 'vuex'
import StatisticsCard from '@/components/Statistics/Card'

export default {
  name: 'SettingsMain',
  components: {StatisticsCard},
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
//@import '../../assets/stylus/components/user-info-form.styl'

.statistics-main
  font-family 'Open Sans'
  display flex
  flex-wrap wrap
  width 100%
  padding 0 20px

  .statistics-main__header
    font-size 24px

  @media (max-width: breakpoint-xl)
    padding 0 10px

.statistics-main__back
  margin-left 20px

</style>
