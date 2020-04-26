<template>
  <div class="profile-wrapper">
    <h1 class="user-name">{{ getUser.name }}'s profile</h1>

    <header>
      <h2>Accounts overview</h2>
      <button class="add-acount-button" @click="showModal">
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

    <AccountModal v-on:close-modal="hideModal" />
  </div>
</template>

<script>
import { mapGetters } from 'vuex'

import AccountCard from '@/components/accounts/AccountCard'
import AccountModal from '@/components/accounts/AccountModal'

export default {
  name: 'Home',
  components: {
    AccountCard,
    AccountModal,
  },
  computed: {
    ...mapGetters(['getUser', 'getAccounts']),
  },
  methods: {
    showModal() {
      this.$modal.show('account-modal')
    },
    hideModal() {
      this.$modal.hide('account-modal')
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
</style>
