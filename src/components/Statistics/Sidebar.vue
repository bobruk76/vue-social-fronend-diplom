<template lang="pug">
  .aside-filter
    ul.aside-filter__list
      li.aside-filter__item(v-for="item in list" :key="item.component" :class="{active: item.component === value}" @click="changeComponent(item)") {{item.text}}
</template>

<script>
export default {
  name: 'StatisticsSidebar',
  props: {
    value: String
  },
  data: () => ({
    list: [
      { component: 'statistics-main', text: 'Общая' },
      { component: 'statistics-posts', text: 'Публикации' },
      { component: 'statistics-users', text: 'Пользователи' },
    ]
  }),
  methods: {
    changeComponent(item) {
      this.$emit('change-component', item)
    }
  }
}
</script>
