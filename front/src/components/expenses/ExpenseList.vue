<template>
  <div>
    <header>
      <h2>Expenses</h2>
      <button class="add-acount-button" @click="showModal('expense-modal')" :disabled="!canAddExpense">
        <v-icon name="plus" />
        <p>
          Add new
        </p>
      </button>
    </header>
    <div class="expense-list-wrapper" v-if="showExpenseList">
      <ExpenseCollapse
        v-for="expense in this.sortedExpenses"
        :key="expense.id"
        :expense="expense"
        v-on:edit-expense="editExpense"
      />
    </div>
    <div class="nothing-to-see" v-else>
      <p>No Expenses recorded yet!</p>
      <p class="hint" v-if="!canAddExpense">
        You need to have at least one account registered to add expenses. Add an Account from the
        <router-link to="/profile">profile page</router-link>
      </p>
    </div>
    <ExpenseModal v-on:close-modal="hideModal('expense-modal')" />
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import dayjs from 'dayjs'

import ExpenseModal from '@/components/expenses/ExpenseModal'
import ExpenseCollapse from './ExpenseCollapse'

export default {
  name: 'CategoryList',
  components: {
    ExpenseCollapse,
    ExpenseModal,
  },
  computed: {
    ...mapGetters(['getExpenses', 'getAccounts']),
    showExpenseList() {
      return this.getExpenses && this.getExpenses.length > 0
    },
    sortedExpenses() {
      return [...this.getExpenses].sort((a, b) => dayjs(b.date) - dayjs(a.date))
    },
    canAddExpense() {
      return this.getAccounts.length > 0
    },
  },
  methods: {
    showModal(modalName) {
      this.$modal.show(modalName)
    },
    hideModal(modalName) {
      this.$modal.hide(modalName)
    },
    editExpense(expense) {
      this.$modal.show('expense-modal', expense)
    },
  },
}
</script>

<style lang="scss" scoped>
@import '../../scss/mixins.scss';

header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: 40px;
  h2 {
    @include section-header;
  }
  button.add-acount-button {
    @include add-new-button;
    align-self: center;
    padding: 8px 16px;
    &:hover {
      cursor: pointer;
    }
  }
}

.expense-list-wrapper {
  margin-top: 16px;

  & > div {
    &:not(:last-of-type) {
      margin-bottom: 24px;
    }
  }
}

.nothing-to-see {
  p {
    &.hint {
      float: right;
      text-align: right;
      width: 355px;
      font-size: 0.9rem;
      color: var(--color-danger);
      margin-top: -16px;
      a {
        color: var(--color-danger);
        font-weight: bold;
      }
    }
  }
}
</style>
