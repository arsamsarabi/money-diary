<template>
  <div class="expense-collapse">
    <header class="collapse-header">
      <div class="left-col">
        <v-icon :name="categories[0].icon" />
      </div>
      <div class="right-col">
        <div class="text">
          <h2>{{ expense.title }}</h2>
          <p>{{ dateBuilder(expense.startDate) }}</p>
        </div>
        <p class="amount">
          <span>£</span>
          {{ expense.amount }}
        </p>
        <div class="toggler">
          <v-icon :name="togglerName" />
        </div>
      </div>
    </header>
    <main class="collapse-body">
      <p>account name</p>
      <p>{{ expense.description }}</p>
      <div v-for="category in categories" :key="category.id">
        {{ category.name }}
      </div>
      <p>is recurring icon {{ expense.isRecurring }}</p>
      <p>end date?</p>
    </main>
  </div>
</template>

<script>
import dayjs from 'dayjs'
import 'vue-awesome/icons/caret-up'
import 'vue-awesome/icons/caret-down'

import { getOneCategory } from '../categories/categories'

export default {
  name: 'ExpanseCollapse',
  props: ['expense'],
  data() {
    return {
      isExpanded: false,
    }
  },
  computed: {
    categories() {
      return this.expense.categories.map(cat => getOneCategory('id', cat))
    },
    togglerName() {
      return this.isExpanded ? 'caret-up' : 'caret-down'
    },
  },
  methods: {
    dateBuilder(date) {
      return date ? dayjs(date).format('DD MMM YYYY') : 'Date: -'
    },
    toggleExpanded() {
      this.isExpanded = !this.isExpanded
    },
  },
}
</script>

<style lang="scss" scoped>
.expense-collapse {
}
</style>
