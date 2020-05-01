<template>
  <div class="dashboard-wrapper">
    <div class="category-list-container">
      <CategoryList />
    </div>
    <div class="expense-list-container">
      <ExpenseList />
    </div>
    <div class="calendar-container">
      <calendar-view
        class="theme-default"
        :disablePast="true"
        :disableFuture="true"
        :startingDayOfWeek="1"
        :events="this.getRecurringForCalendar"
      >
        <div slot="header" slot-scope="{ headerProps }" class="calendar-header">
          <p>Recurring expenses</p>
          <h1>{{ headerProps.periodLabel }}</h1>
        </div>
      </calendar-view>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import { CalendarView } from 'vue-simple-calendar'
require('vue-simple-calendar/static/css/default.css')

import CategoryList from '../components/categories/CategoryList'
import ExpenseList from '../components/expenses/ExpenseList'

export default {
  name: 'Dashboard',
  components: {
    CalendarView,
    CategoryList,
    ExpenseList,
  },
  computed: {
    ...mapGetters(['getRecurringForCalendar']),
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

.calendar-container {
  margin-top: 32px;
}

.calendar-header {
  border: 1px solid var(--color-grey-xlight);
  border-bottom: 0;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 16px;
  h1 {
    font-family: var(--font-secondary);
    font-size: 1.5rem;
    color: var(--color-grey);
  }
  p {
    margin-right: auto;
    font-size: 0.9rem;
    color: var(--color-grey);
  }
}
</style>
