<template>
  <div class="categories-list-wrapper">
    <h1>Categories</h1>
    <div class="categories-row">
      <CategoryCard
        v-for="category in this.randomCategories"
        :key="category.label"
        :label="category.label"
        :icon="category.icon"
        :color="category.color"
      />
    </div>
  </div>
</template>

<script>
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
.categories-list-wrapper {
  padding-top: 8px;
  h1 {
    font-family: var(--font-secondary);
    font-size: 1.125rem;
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
</style>
