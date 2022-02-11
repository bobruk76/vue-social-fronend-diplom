<template lang="pug">
  .statistics.inner-page
    h1.statistics__title {{activeComponent.text}}
    .statistics__wrap
      .inner-page__main
        component(:is="activeComponent.component" :line-data="lineData" :bar-data="barData")
      .inner-page__aside
        statistics-sidebar(v-model="activeComponent.component" @change-component="onChange")
</template>

<script>
import {mapActions, mapGetters} from "vuex";
import StatisticsSidebar from '@/components/Statistics/Sidebar'
import StatisticsMain from '@/components/Statistics/Main'
import StatisticsPosts from '@/components/Statistics/Posts'
import StatisticsLineBar from '@/components/Statistics/LineBar'
import StatisticsUsers from '@/components/Statistics/Users'

export default {
  name: 'AdminStatistics',
  components: {StatisticsSidebar, StatisticsMain, StatisticsPosts, StatisticsUsers, StatisticsLineBar},
  data: () => ({
    activeComponent: {component: 'statistics-main', text: 'Общая'},
    lineData: null,
    barData: null,
  }),
  computed: {
    ...mapGetters('admin/info', ['getPostsStatistic']),
  },
  methods: {
    ...mapActions('admin/info', ['apiPostsStatistic']),
    onChange(item) {
      this.activeComponent = item
      switch (item.component) {
        case 'statistics-posts' : {
          this.apiPostsStatistic()
            .then(() => {
              this.activeComponent.component = 'statistics-line-bar'
              this.lineData = this.getPostsStatistic.monthData
              this.barData = this.getPostsStatistic.hourData
            })
          break
        }
      }
    }
  },
}
</script>
<style lang="stylus">
@import '../../assets/stylus/base/vars.styl';

.statistics
  display block

  @media (max-width: breakpoint-xl)
    .inner-page__aside
      display block
      max-width 100%

    .inner-page__main
      margin-right 0

.statistics__title
  font-family font-exo
  font-weight 200
  font-size 30px
  margin-bottom 20px
  color #000

  @media (max-width: breakpoint-xl)
    display none

.statistics__wrap
  display flex

  @media (max-width: breakpoint-xl)
    flex-direction column
    .inner-page__aside
      display block
      margin-bottom 0
</style>
