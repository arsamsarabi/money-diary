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
@import '../../scss/mixins.scss';

.expense-list-wrapper {
  padding-top: 32px;

  h1 {
    @include section-header;
  }

  & > div {
    &:not(:last-of-type) {
      margin-bottom: 24px;
    }
  }
}
</style>
