<template>
  <div class="container">
    <div v-for="income in getRecurringIncomes" :key="income.id">
      <table>
        <thead>
          <tr>
            <th></th>
            <th></th>
            <th></th>
            <th></th>
            <th></th>
          </tr>
        </thead>
      </table>
      <p>{{ income.title }}</p>
    </div>
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
