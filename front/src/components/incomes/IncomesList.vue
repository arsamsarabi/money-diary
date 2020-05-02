<template>
  <div class="container">
    <h1>Incomes</h1>
    <Collapse v-for="{ id, amount, title, date, description, payer, account } in getOneOffIncomes" :key="id">
      <div slot="header" class="recurring-collapse-header">
        <section class="recurring-amount">
          <p>£{{ amount }}</p>
        </section>
        <section class="recurring-detail">
          <h2>{{ title }}</h2>
          <p>{{ dateBuilder(date) }}</p>
        </section>
      </div>
      <div slot="body" class="recurring-collapse-body">
        <div class="description">
          <span>Description: </span>
          <p>{{ description || '-' }}</p>
        </div>

        <div class="payer">
          <span>Payer: </span>
          <p>{{ payer }}</p>
        </div>

        <div class="account">
          <span>Account: </span>
          <p>{{ account.name }}</p>
        </div>
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
  name: 'IncomesList',
  components: { Collapse },
  computed: {
    ...mapGetters(['getOneOffIncomes']),
  },
  methods: {
    dateBuilder(d) {
      return dayjs(d).format('Do of MMMM YYYY')
    },
  },
}
</script>

<style lang="scss" scoped>
@import '../../scss/collapse.scss';

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
    h2 {
      @extend %collapse-title;
    }
    p {
      @extend %collapse-subtitle;
    }
  }
}

.recurring-collapse-body {
  & > div {
    @include label-and-text;
  }
}
</style>
