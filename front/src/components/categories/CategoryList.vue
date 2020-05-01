<template>
  <div class="categories-list-wrapper">
    <h1>Categories</h1>
    <div class="categories-row">
      <CategoryCard v-for="category in getTopCategories" :key="category.id" :category="category" />
      <router-link to="/expenses" class="view-more-button">
        <v-icon name="plus" />
        <p>View all</p>
      </router-link>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'

import CategoryCard from './CategoryCard'

export default {
  name: 'CategoryList',
  components: {
    CategoryCard,
  },
  computed: {
    ...mapGetters(['getCategories']),
    getTopCategories() {
      return [...this.getCategories].sort((a, b) => b.expensesSum - a.expensesSum).slice(0, 4)
    },
  },
}
</script>

<style lang="scss" scoped>
@import '../../scss/mixins.scss';

.categories-list-wrapper {
  h1 {
    @include section-header;
    margin-bottom: 16px;
  }
}

.categories-row {
  display: flex;
  & > div {
    &:not(:last-of-type) {
      margin-right: 16px;
    }
  }
}

.view-more-button {
  @include add-new-button;
  margin-left: 16px;
}
</style>
