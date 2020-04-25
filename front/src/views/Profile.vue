<template>
  <div class="profile-wrapper">
    <h1 class="user-name">{{ getUser.name }}'s profile</h1>

    <h2>Accounts overview</h2>
    <div class="accounts">
      <AccountCard v-for="account in getAccounts" :key="account.id" :account="account" />
      <button class="add-acount-button" @click="showModal">
        <v-icon name="plus" />
        <p>
          Create new
        </p>
      </button>
    </div>

    <AccountModal />
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
  },
}
</script>

<style lang="scss" scoped>
@import '../scss/mixins.scss';

.profile-wrapper {
  flex: 1;
  h2 {
    @include section-header;
    margin-top: 16px;
  }
}

.user-name {
  font-family: var(--font-secondary);
  font-size: 3rem;
}

.accounts {
  display: flex;
  flex-wrap: wrap;
  margin-top: 16px;
  & > div {
    margin-right: 24px;
  }
}

button.add-acount-button {
  @include add-new-button;
  align-self: center;
  height: 80px;
  &:hover {
    cursor: pointer;
  }
}
</style>
