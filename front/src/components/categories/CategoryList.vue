<template>
  <div class="categories-list-wrapper">
    <h1>Categories</h1>
    <div class="categories-row">
      <CategoryCard
        v-for="category in this.randomCategories"
        :key="category.id"
        :id="category.id"
        :label="category.label"
        :icon="category.icon"
        :color="category.color"
      />
      <router-link to="/categories" class="view-more-button">
        <v-icon name="plus" />
        <p>View all</p>
      </router-link>
    </div>
  </div>
</template>

<script>
import 'vue-awesome/icons/plus'
import CategoryCard from './CategoryCard'
import { defaultCategories } from './categories'

export default {
  name: 'CategoryList',
  components: {
    CategoryCard,
  },
  computed: {
    randomCategories() {
      const numberOfCategories = 4
      const randomIndexes = []
      while (randomIndexes.length < numberOfCategories) {
        const random = Math.floor(Math.random() * defaultCategories.length)
        if (randomIndexes.indexOf(random) === -1) randomIndexes.push(random)
      }
      return randomIndexes.map(i => defaultCategories[i])
    },
  },
}
</script>

<style lang="scss" scoped>
@import '../../scss/mixins.scss';

.categories-list-wrapper {
  h1 {
    @include section-header;
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
  @include card-with-shadow(var(--color-secondary));
  display: flex;
  justify-content: flex-start;
  align-items: center;
  padding: 0 16px;
  text-decoration: none;
  color: var(--color-white);
  margin-left: 16px;
  svg {
    margin-right: 8px;
  }
}
</style>
