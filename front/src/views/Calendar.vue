<template>
  <div class="calendar">
    <p>Recurring expenses</p>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  name: 'CalendarPage',
  computed: {
    ...mapGetters(['getRecurring']),
  },
}
</script>

<style lang="scss" scoped></style>
