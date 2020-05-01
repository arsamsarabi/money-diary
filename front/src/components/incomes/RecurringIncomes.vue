<template>
  <div class="container">
    <table>
      <thead>
        <tr>
          <th>Title</th>
          <th>Description</th>
          <th>Amount</th>
          <th>Date</th>
          <th>Frequency</th>
          <th>Days p/w</th>
          <th>Payer</th>
          <th>Account</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="income in getRecurringIncomes" :key="income.id">
          <td>{{ income.title }}</td>
          <td>{{ income.description }}</td>
          <td>{{ income.amount }}</td>
          <td>{{ income.date }}</td>
          <td>{{ income.frequency }}</td>
          <td>{{ income.daysPerWeek }}</td>
          <td>{{ income.payer }}</td>
          <td>{{ income.account.name }}</td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  name: 'RecurringIncomes',
  props: ['recurringIncomes'],
  computed: {
    ...mapGetters(['getRecurringIncomes']),
  },
}
</script>

<style lang="scss" scoped>
.container {
  flex: 1;
  border: 1px solid hotpink;
}
</style>
