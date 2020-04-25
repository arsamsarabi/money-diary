<template>
  <div class="profile-wrapper">
    <h1 class="user-name">{{ getUser.name }}'s profile</h1>

    <div class="accounts">
      <AccountCard v-for="account in getAccounts" :key="account.id" :account="account" />
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'

import AccountCard from '@/components/accounts/AccountCard'

export default {
  name: 'Home',
  components: {
    AccountCard,
  },
  computed: {
    ...mapGetters(['getUser', 'getAccounts']),
  },
}
</script>

<style lang="scss" scoped>
.profile-wrapper {
  flex: 1;
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
    &:not(:last-of-type) {
      margin-right: 24px;
    }
  }
}
</style>
