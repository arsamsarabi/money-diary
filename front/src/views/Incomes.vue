<template>
  <div class="incomes-page">
    <h1>This is the incomes page</h1>

    <div class="temp-actions">
      <button class="cta" @click="showModal('income-modal')">
        <v-icon name="plus" />
        <p>Add Income</p>
      </button>
    </div>

    <IncomeModal v-on:close-modal="hideModal('income-modal')" />
  </div>
</template>
<script>
import IncomeModal from '@/components/incomes/IncomeModal'

export default {
  name: 'IncomessPage',
  components: {
    IncomeModal,
  },
  methods: {
    showModal(modalName) {
      this.$modal.show(modalName)
    },
    hideModal(modalName) {
      this.$modal.hide(modalName)
    },
  },
}
</script>
