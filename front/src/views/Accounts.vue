<template>
  <div class="accounts-page">
    <header>
      <h2>Accounts overview</h2>
      <button class="add-acount-button" @click="showModal('account-modal')">
        <v-icon name="plus" />
        <p>
          Create new
        </p>
      </button>
    </header>

    <div class="accounts-cards" v-if="this.getAccounts.length">
      <AccountCard
        v-on:edit-account="editAccount"
        v-for="account in getAccounts"
        :key="account.id"
        :account="account"
      />
    </div>

    <AccountModal v-on:close-modal="hideModal('account-modal')" />
  </div>
</template>
<script>
import { mapGetters } from 'vuex'

import AccountCard from '@/components/accounts/AccountCard'
import AccountModal from '@/components/accounts/AccountModal'

export default {
  name: 'AccountsPage',
  components: {
    AccountCard,
    AccountModal,
  },
  computed: {
    ...mapGetters(['getAccounts']),
  },
  methods: {
    showModal(modalName) {
      this.$modal.show(modalName)
    },
    hideModal(modalName) {
      this.$modal.hide(modalName)
    },
    editAccount(account) {
      this.$modal.show('account-modal', account)
    },
  },
}
</script>
<style lang="scss" scoped>
@import '../scss/mixins.scss';

.accounts-page {
  display: flex;
  flex-direction: column;
}

.accounts-header {
  h2 {
  }
  button {
    @extend %button-primary;
    width: 208px;
    height: 48px;
    justify-content: space-between;
    padding: 0 16px;
    margin-bottom: 16px;
  }
}
.accounts-cards {
  display: flex;
  flex-wrap: wrap;
  margin-top: 8px;
  & > div {
    margin: 8px;
    &:last-child {
      margin-right: auto;
    }
  }
}
</style>
