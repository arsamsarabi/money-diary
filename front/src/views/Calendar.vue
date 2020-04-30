<template>
  <div class="calendar-page">
    <p>Recurring expenses</p>
    <!-- prettier-ignore -->
    <calendar-view
      :show-date="showDate"
      class="theme-default"
      :disablePast="true"
      :disableFuture="true"
      :startingDayOfWeek="1"
      :events="events"
    >
      <div slot="header" slot-scope="{ headerProps }" class="calendar-header">
        <h1>{{headerProps.periodLabel}}</h1>
      </div>
    </calendar-view>
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'
import { CalendarView } from 'vue-simple-calendar'
import dayjs from 'dayjs'
require('vue-simple-calendar/static/css/default.css')

export default {
  name: 'CalendarPage',
  components: {
    CalendarView,
  },
  data() {
    return {
      showDate: new Date(),
      events: [],
    }
  },
  created() {
    if (this.getExpenses.length === 0) {
      this.fetchExpensesByUserId()
    } else {
      const events = this.getRecurringForCalendar(this.getCategories)
      this.events = events
    }
  },
  computed: {
    ...mapGetters(['getRecurringForCalendar', 'getCategories', 'getExpenses']),
  },
  methods: {
    ...mapActions(['fetchExpensesByUserId']),
    setShowDate(d) {
      this.showDate = d
    },
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
  height: 48px;
  border: 1px solid var(--color-grey-xlight);
  border-bottom: 0;
  display: flex;
  justify-content: center;
  align-items: center;
  h1 {
    font-family: var(--font-secondary);
    font-size: 1.25rem;
    color: var(--color-black);
  }
}
</style>
