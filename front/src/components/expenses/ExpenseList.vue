<template>
  <div class="expense-list-wrapper">
    <h1>Expenses</h1>
    <ExpenseCollapse v-for="expense in this.getExpenses" :key="expense.id" :expense="expense" />
  </div>
</template>

<script>
import { mapGetters } from 'vuex'

import ExpenseCollapse from './ExpenseCollapse'

export default {
  name: 'CategoryList',
  components: {
    ExpenseCollapse,
  },
  computed: mapGetters(['getExpenses']),
}
</script>

<style lang="scss" scoped>
.expense-list-wrapper {
  padding-top: 8px;
  h1 {
    font-family: var(--font-secondary);
    font-size: 1.125rem;
    margin-bottom: 16px;
  }
}
</style>
