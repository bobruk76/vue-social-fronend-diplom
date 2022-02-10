<template lang="pug">
  .posts-main
    statistics-line(
      v-if="getIsDataLoad"
      :chart-data="getPostsStatistic.monthData"
      :options="options"
      :styles="lineStyles"
    )
    statistics-bar(
      v-if="getIsDataLoad"
      :chart-data="getPostsStatistic.hourData"
      :options="options"
      :styles="lineStyles"
    )
</template>

<script>
import {mapGetters, mapActions} from 'vuex'
import StatisticsLine from '@/components/Statistics/Line'
import StatisticsBar from '@/components/Statistics/Bar'

export default {
  name: 'SettingsMain',
  components: {StatisticsLine, StatisticsBar},
  data: () => ({
    isDataLoad: false,
    options: {
      responsive: true,
      maintainAspectRatio: false
    }
  }),
  computed: {
    ...mapGetters('admin/info', ['getPostsStatistic', 'getIsDataLoad']),
    lineStyles() {
      return {
        width: '100%',
        position: 'relative'
      }
    }
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

.posts-main
  font-family 'Open Sans'
  display flex
  flex-wrap wrap
  position: relative
  width 100%
  padding 0 20px

  &__line
    width 100%


</style>
