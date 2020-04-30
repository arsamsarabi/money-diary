<template>
  <div class="calendar-page">
    <calendar-view
      class="theme-default"
      :disablePast="true"
      :disableFuture="true"
      :startingDayOfWeek="1"
      :events="events"
    >
      <div slot="header" slot-scope="{ headerProps }" class="calendar-header">
        <p>Recurring expenses</p>
        <h1>{{ headerProps.periodLabel }}</h1>
      </div>
    </calendar-view>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import { CalendarView } from 'vue-simple-calendar'
import dayjs from 'dayjs'
require('vue-simple-calendar/static/css/default.css')

export default {
  name: 'CalendarPage',
  components: {
    CalendarView,
  },
  computed: {
    ...mapGetters(['getRecurringForCalendar', 'getCategories']),
    events() {
      return this.getRecurringForCalendar(this.getCategories)
    },
  },
  methods: {
    monthName(date) {
      return dayjs(date).format('MMMM')
    },
  },
}
</script>

<style lang="scss" scoped>
.calendar-page {
  flex: 1;
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
