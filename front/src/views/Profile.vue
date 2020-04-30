<template>
  <div class="profile-wrapper" v-if="getUser">
    <div class="user-name">
      <span>{{ getUser.name }}</span
      >'s profile
      <button @click="showModal('user-modal')">
        <v-icon name="pencil-alt" scale="0.8" />
      </button>
    </div>

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
    <UserModal v-on:close-modal="hideModal('user-modal')" />

    <!-- TEMP LOCATION FOR THIS ACTIONS -->

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
import { mapGetters } from 'vuex'

import AccountCard from '@/components/accounts/AccountCard'
import AccountModal from '@/components/accounts/AccountModal'
import IncomeModal from '@/components/income/IncomeModal'
import UserModal from '@/components/UserModal'

export default {
  name: 'Home',
  components: {
    AccountCard,
    AccountModal,
    IncomeModal,
    UserModal,
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
  span {
    text-transform: capitalize;
  }
  button {
    color: var(--color-grey);
    transition: 0.2s all ease-in-out;

    &:hover,
    &:focus {
      cursor: pointer;
      color: var(--color-primary);
    }
  }
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
