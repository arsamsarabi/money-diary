<template>
  <div class="dashboard-wrapper">
    <div class="category-list-container">
      <CategoryList />
    </div>
    <div class="expense-list-container">
      <ExpenseList />
    </div>
  </div>
</template>

<script>
import CategoryList from '../components/categories/CategoryList'
import ExpenseList from '../components/expenses/ExpenseList'

export default {
  name: 'Dashboard',
  components: {
    CategoryList,
    ExpenseList,
  },
}
</script>

<style lang="scss" scoped>
.dashboard-wrapper {
  .category-list-container {
    margin-top: 8px;
  }
  .expense-list-container {
    margin-top: 16px;
  }
}
</style>
