<template>
  <div class="container">
    <h1>Recurring incomes</h1>
    <Collapse
      v-for="{ id, amount, title, date, frequency, description, daysPerWeek, payer, account } in getRecurringIncomes"
      :key="id"
    >
      <div slot="header" class="recurring-collapse-header">
        <section class="recurring-amount">
          <p>£{{ amount }}</p>
        </section>
        <section class="recurring-detail">
          <p>{{ title }}</p>
          <p>{{ frequencyText(date, frequency, daysPerWeek) }}</p>
        </section>
      </div>
      <div slot="body">
        <p>Description</p>
        <p>{{ description }}</p>
        <p>Payer</p>
        <p>{{ payer }}</p>
        <p>Account</p>
        <p>{{ account.name }}</p>
      </div>
    </Collapse>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import dayjs from 'dayjs'
import advancedFormat from 'dayjs/plugin/advancedFormat'

import Collapse from '@/components/Collapse.vue'

dayjs.extend(advancedFormat)

export default {
  name: 'RecurringIncomes',
  components: { Collapse },
  computed: {
    ...mapGetters(['getRecurringIncomes']),
  },
  methods: {
    date(d, format = 'long') {
      if (format == 'short') {
        return dayjs(d).format('Do')
      }
      return dayjs(d).format('Do of MMMM')
    },
    frequencyText(date, frequency, daysPerWeek) {
      switch (frequency) {
        case 'Daily':
          return `per day / ${daysPerWeek} a week`
        case 'Weekly':
          return `per week`
        case 'Monthly':
          return `${this.date(date, 'short')} of every month`
        case 'Yearly':
          return `per year on ${this.date(date)}`
      }
    },
  },
}
</script>

<style lang="scss" scoped>
@import '../../scss/mixins.scss';

.container {
  flex: 1;
  margin-top: 32px;
  h1 {
    font-family: var(--font-secondary);
    margin-bottom: 8px;
  }
  & > div {
    &:not(:last-of-type) {
      margin-bottom: 16px;
    }
  }
}

.recurring-collapse-header {
  flex: 1;
  display: flex;
  .recurring-amount {
    width: 100px;
    display: flex;
    justify-content: center;
    align-items: center;
    p {
      font-family: var(--font-secondary);
      color: var(--color-success);
      font-weight: bold;
      font-size: 1.25rem;
    }
  }
  .recurring-detail {
    p {
      &:first-of-type {
        font-weight: bold;
        color: var(--color-grey);
      }
      &:last-of-type {
        font-size: 0.9rem;
        color: var(--color-grey);
      }
    }
  }
}
</style>
