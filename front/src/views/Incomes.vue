<template>
  <div class="incomes-page">
    <header class="incomes-header">
      <h2 class="page-title">Incomes overview</h2>
      <button class="page-action" @click="showModal('income-modal')">
        <v-icon name="plus" />
        <p>
          New Income
        </p>
      </button>
    </header>

    <RecurringIncomes />

    <IncomesList />

    <IncomeModal v-on:close-modal="hideModal('income-modal')" />
  </div>
</template>
<script>
import { mapGetters } from 'vuex'

import IncomeModal from '@/components/incomes/IncomeModal'
import RecurringIncomes from '@/components/incomes/RecurringIncomes'
import IncomesList from '@/components/incomes/IncomesList'

export default {
  name: 'IncomessPage',
  components: {
    RecurringIncomes,
    IncomesList,
    IncomeModal,
  },
  methods: {
    ...mapGetters(['getOneOffIncomes']),
    showModal(modalName) {
      this.$modal.show(modalName)
    },
    hideModal(modalName) {
      this.$modal.hide(modalName)
    },
  },
}
</script>
<style lang="scss" scoped>
@import '../scss/pages.scss';

.incomes-page {
  @extend %page-container;
}

.incomes-header {
  @extend %page-header;
}
</style>
