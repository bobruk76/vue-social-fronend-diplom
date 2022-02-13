<template lang="pug">
  .statistics.inner-page
    h1.statistics__title {{activeComponent.text}}
    .statistics__wrap
      .inner-page__main
        statistics-main(v-if="activeComponent.component==='main'")
        statistics-line-bar(
          v-else-if="getIsDataLoad"
          :line-data="getCategoryStatistic.lineData"
          :bar-data="getCategoryStatistic.barData"
          :title-data="titleData"
          :category="activeComponent.component"
        )
      .inner-page__aside
        statistics-sidebar(v-model="activeComponent.component" @change-component="onChange")
</template>

<script>
import {mapActions, mapGetters, mapMutations} from "vuex";
import StatisticsSidebar from '@/components/Statistics/Sidebar'
import StatisticsMain from '@/components/Statistics/Main'
import StatisticsLineBar from '@/components/Statistics/LineBar'

export default {
  name: 'AdminStatistics',
  components: {StatisticsSidebar, StatisticsMain, StatisticsLineBar},
  data: () => ({
    activeComponent: {component: 'main', text: 'Общая'},
    titleData: null,
  }),
  computed: {
    ...mapGetters('admin/info', ['getCategoryStatistic', 'getIsDataLoad']),
  },
  methods: {
    ...mapActions('admin/info', ['apiCategoryStatistic']),
    ...mapMutations('admin/info', ['setIsDataLoad']),
    onChange(item) {
      this.setIsDataLoad(false)
      this.titleData = {}
      this.activeComponent = item
      if (item.component !== 'main') {
        this.apiCategoryStatistic(item.component)
          .then(async () => {
            this.titleData = {
              title: 'Публикаций за все время:',
              count: this.getCategoryStatistic.count,
              img: this.getCategoryStatistic.svgFilePath,
            }
          })
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
