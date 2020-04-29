<template>
  <div class="card">
    <img :src="userImage" />
    <h1>
      Hello, <span>{{ userName }}</span
      >! 👋🏻
    </h1>
    <NavLinkIcon text="Profile" icon="user" path="/profile" />
    <NavLinkIcon text="Settings" icon="cog" path="/settings" />
    <NavLinkIcon text="Wallet" icon="wallet" path="/wallet" />
    <button @click="handleLogout" class="logout-button">
      Logout
      <v-icon name="sign-out-alt" />
    </button>
  </div>
</template>

<script>
import DefaultImage from '@/assets/avatar-placeholder.svg'
import NavLinkIcon from '../NavLinkIcon'

import { mapGetters } from 'vuex'

export default {
  name: 'ProfileCard',
  components: {
    NavLinkIcon,
  },
  computed: {
    ...mapGetters(['getUser']),
    userImage() {
      return this.getUser?.image || DefaultImage
    },
    userName() {
      return this.getUser?.name || ''
    },
  },
  methods: {
    handleLogout() {
      this.$auth.logout({
        returnTo: window.location.origin,
      })
    },
  },
}
</script>

<style lang="scss" scoped>
@import '../../scss/mixins.scss';

.card {
  @include card-with-shadow;
  width: 100%;
  margin-top: 48px;
  padding: 24px;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;

  img {
    width: 75px;
    height: 75px;
    overflow: hidden;
    border: 2px solid var(--color-grey-light);
    border-radius: 50%;
  }

  h1 {
    font-family: var(--font-secondary);
    font-size: 1.25rem;
    margin: 16px 0;
    span {
      text-transform: capitalize;
    }
  }

  a {
    &:not(:last-of-type) {
      margin-bottom: 8px;
    }
  }

  button.logout-button {
    width: 100%;
    text-decoration: none;
    color: var(--color-grey);
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin-top: 24px;
    transition: 0.2s all ease-in;
    &:hover,
    &:focus {
      cursor: pointer;
      color: var(--color-danger);
    }
  }
}
</style>
