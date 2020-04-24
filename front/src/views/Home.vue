<template>
  <div class="home">
    HOME PAGE
    <CategoryCard
      v-for="category in this.categories"
      :key="category.label"
      :label="category.label"
      :icon="category.icon"
      :color="category.color"
    />
  </div>
</template>

<script>
// @ is an alias to /src
import CategoryCard from '../components/categories/CategoryCard'
import { defaultCategories } from '../components/categories/categories'

export default {
  name: 'Home',
  components: {
    CategoryCard,
  },
  data() {
    return {
      categories: defaultCategories,
    }
  },
}
</script>
