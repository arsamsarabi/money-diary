<template>
  <div class="card">
    <img :src="userImage" />
    <h1>Hello, {{ this.getUserName }}! 👋🏻</h1>
    <NavLinkIcon text="Profile" icon="user" path="/profile" />
    <NavLinkIcon text="Settings" icon="cog" path="/settings" />
    <NavLinkIcon text="Wallet" icon="wallet" path="/wallet" />
    <button>
      Logout
      <v-icon name="sign-out-alt" />
    </button>
  </div>
</template>

<script>
import DefaultImage from '../../assets/avatars/128_13.png'
import NavLinkIcon from '../NavLinkIcon'

import { mapGetters } from 'vuex'

export default {
  name: 'ProfileCard',
  props: {
    userImage: {
      type: String,
      default: DefaultImage,
    },
  },
  components: {
    NavLinkIcon,
  },
  computed: mapGetters(['getUserName']),
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
  }

  a {
    &:not(:last-of-type) {
      margin-bottom: 8px;
    }
  }
}
</style>
