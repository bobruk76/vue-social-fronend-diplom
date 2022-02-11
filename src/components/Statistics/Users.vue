<template lang="pug">
  .users-main
    .users-main__header
      span.users-main__header-discr {{ getUsersStatistic.usersCount }}
      span.users-main__header-title Пользователей зарегистрировано:

    statistics-line.users-main__line(
      v-if="getIsDataLoad"
      :chart-data="getUsersStatistic.dynamic"
      :options="options"
      :styles="lineStyles"
    )

    //statistics-doughnut.users-main__line(
    //  v-if="getIsDataLoad"
    //  :chart-data="getUsersStatistic.dynamic"
    //  :options="options"
    //  :styles="lineStyles"
    //)
</template>

<script>
import {mapGetters, mapActions, mapMutations} from 'vuex'
import StatisticsLine from '@/components/Statistics/Line'
import StatisticsDoughnut from '@/components/Statistics/Doughnut'

export default {
  name: 'SettingsMain',
  components: {StatisticsLine, StatisticsDoughnut},
  data: () => ({
    isDataLoad: false,
    options: {
      responsive: true,
      maintainAspectRatio: false
    }
  }),
  computed: {
    ...mapGetters('admin/info', ['getUsersStatistic', 'getIsDataLoad']),
    lineStyles() {
      return {
        width: '100%',
        'max-height': '300px',
        position: 'relative'
      }
    }
  },
  methods: {
    ...mapActions('admin/info', ['apiUsersStatistic']),
    showFriends(value) {
      this.isShow[value] = !this.isShow[value]
    }
  },
  mounted() {
    this.apiUsersStatistic()
  },
}
</script>

<style lang="stylus">
@import '../../assets/stylus/base/vars.styl'

.users-main
  font-family 'Open Sans'
  display flex
  flex-wrap wrap
  position relative
  background-color #fff
  width 100%
  padding 0 20px
  &__header
    display flex
    flex-direction row-reverse
    align-items center
    width 100%
    height h = calc(100vh / 4)
    max-height 100px
    background-color eucalypt
    background-image url('/static/img/statistics/users-count.svg')
    background-position: left center;
    background-repeat: no-repeat;
    margin-bottom 20px
    color #fff
    &-title
      font-size 20px
      padding-right 20px
    &-discr
      font-weight 600
      font-size 39px
      padding-right 20px
  &__line
    margin-bottom 20px

</style>
