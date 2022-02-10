<template lang="pug">
  .statistics-main
    statistics-line(
      v-if="getIsDataLoad"
      :chart-data="getPostsStatistic.monthData"
      :options="options"
      )
    //statistics-card(v-for="(item, index) in getStatistics" :key="index" :statistic="item")
</template>

<script>
import {mapGetters, mapActions} from 'vuex'
import StatisticsLine from '@/components/Statistics/Line'
import StatisticsBar from '@/components/Statistics/Bar'
export default {
  name: 'SettingsMain',
  components: {StatisticsLine},
  data: () => ({
    isDataLoad: false,
    options: {
      responsive: true,
      maintainAspectRatio: false
    }
  }),
  computed: {
    ...mapGetters('admin/info', ['getPostsStatistic', 'getIsDataLoad']),
  },
  methods: {
    ...mapActions('admin/info', ['apiPostsStatistic']),
    showFriends(value) {
      this.isShow[value] = !this.isShow[value]
    }
  },
  beforeMount() {
    this.apiPostsStatistic()
  },
}
</script>

<style lang="stylus">
@import '../../assets/stylus/base/vars.styl'

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
