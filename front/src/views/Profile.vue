<template>
  <div class="profile-wrapper" v-if="getUser">
    <h1 class="user-name">{{ getUser.name }}'s profile</h1>

    <header>
      <h2>Accounts overview</h2>
      <button class="add-acount-button" @click="showModal('account-modal')">
        <v-icon name="plus" />
        <p>
          Create new
        </p>
      </button>
    </header>

    <div class="accounts" v-if="this.getAccounts.length">
      <AccountCard
        v-on:edit-account="editAccount"
        v-for="account in getAccounts"
        :key="account.id"
        :account="account"
      />
    </div>

    <AccountModal v-on:close-modal="hideModal('account-modal')" />

    <!-- TEMP LOCATION FOR THIS ACTIONS -->

    <div class="temp-actions">
      <button class="cta" @click="showModal('expense-modal')">
        <v-icon name="plus" />
        <p>Add Expense</p>
      </button>

      <button class="cta" @click="showModal('income-modal')">
        <v-icon name="plus" />
        <p>Add Income</p>
      </button>
    </div>

    <ExpenseModal v-on:close-modal="hideModal('expense-modal')" />
    <IncomeModal v-on:close-modal="hideModal('income-modal')" />
  </div>
</template>

<script>
import { mapGetters } from 'vuex'

import AccountCard from '@/components/accounts/AccountCard'
import AccountModal from '@/components/accounts/AccountModal'
import ExpenseModal from '@/components/expenses/ExpenseModal'
import IncomeModal from '@/components/income/IncomeModal'

export default {
  name: 'Home',
  components: {
    AccountCard,
    AccountModal,
    ExpenseModal,
    IncomeModal,
  },
  computed: {
    ...mapGetters(['getUser', 'getAccounts']),
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

.profile-wrapper {
  flex: 1;
  header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-top: 16px;
    h2 {
      @include section-header;
      margin: 0;
    }
    button.add-acount-button {
      @include add-new-button;
      align-self: center;
      padding: 8px 16px;
      &:hover {
        cursor: pointer;
      }
    }
  }
}

.user-name {
  font-family: var(--font-secondary);
  font-size: 3rem;
}

.accounts {
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

.temp-actions {
  margin-top: 32px;
  display: flex;
  flex-direction: column;
  padding-left: 8px;

  .cta {
    @extend %button-primary;
    width: 208px;
    height: 48px;
    justify-content: space-between;
    padding: 0 16px;
    margin-bottom: 16px;
  }
}
</style>
