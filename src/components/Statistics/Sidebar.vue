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
      { component: 'posts', text: 'Публикации' },
      { component: 'statistics-users', text: 'Пользователи' },
      { component: 'comments', text: 'Комментарии' },
      { component: 'likes', text: 'Лайков' },
    ]
  }),
  methods: {
    changeComponent(item) {
      this.$emit('change-component', item)
    }
  }
}
</script>
