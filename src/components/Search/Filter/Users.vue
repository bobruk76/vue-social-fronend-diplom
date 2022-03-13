<template lang="pug">
  .search-filter
    .search-filter__block.name
      label.search__label(for="search-people-name") Имя:
      input.search__input(type="text" id="search-people-name" v-model="first_name")
    .search-filter__block.lastname
      label.search__label(for="search-people-lastname") Фамилия:
      input.search__input(type="text" id="search-people-lastname" v-model="last_name")
    .search-filter__block.age
      label.search__label Возраст:
      .search__row
        select.select.search-filter__select(v-model.number="age_from")
          option(value="null" disabled) От
          option(value="31") От 31
          option(value="32") От 32
          option(value="33") От 33
        span.search__age-defis —
        select.select.search-filter__select(v-model.number="age_to")
          option(value="null" disabled) До
          option(value="34") До 34
          option(value="35") До 35
          option(value="36") До 36
    .search-filter__block.region
      label.search__label Регион:
      .search__row
        select.select.search-filter__select(v-model="country")
          option(value="null" disabled) Страна
          option Россия
          option Англия
          option США
        select.select.search-filter__select(v-model="city")
          option(value="null" disabled) Город
          option Москва
          option Лондон
          option Техас
    .search-filter__block.btn-news(@click.prevent="onSearchUsers")
      button-hover Применить
</template>

<script>
import {mapMutations, mapActions} from 'vuex'

export default {
  name: 'SearchFilterUsers',
  data: () => ({
    first_name: null,
    last_name: null,
    age_from: null,
    age_to: null,
    country: null,
    city: null,
    offset: 0,
    itemPerPage: 20
  }),
  methods: {
    ...mapActions('global/search', ['searchUsers', 'clearSearch']),
    ...mapMutations('global/search', ['setQuery']),
    onSearchUsers() {
      this.clearSearch()
      let {first_name, last_name, age_from, age_to, country, city} = this
      this.setQuery({
        param: 'users',
        value: {
          first_name: this.first_name,
          last_name: this.last_name,
          age_from: this.age_from,
          age_to: this.age_to,
          country: this.country,
          city: this.city,
        }
      })
      this.searchUsers()
    }
  }
}
</script>
