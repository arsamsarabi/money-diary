<template>
  <div class="card">
    <img :src="userImage" />
    <h1>Hello, Arsam! 👋🏻</h1>
    <NavLinkIcon text="Profile" icon="pencil-alt" path="/profile" />
    <NavLinkIcon text="Settings" icon="cog" path="/settings" />
    <NavLinkIcon text="Wallet" icon="wallet" path="/wallet" />
  </div>
</template>

<script>
import 'vue-awesome/icons/pencil-alt'
import 'vue-awesome/icons/cog'
import 'vue-awesome/icons/wallet'

import DefaultImage from '../../assets/avatars/1.svg'
import NavLinkIcon from '../NavLinkIcon'

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
}
</script>

<style lang="scss" scoped>
.card {
  width: 100%;
  background-color: #fff;
  margin-top: 48px;
  box-shadow: 1px 1px 5px 0px rgba(0, 0, 0, 0.125);
  padding: 24px;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
  border-radius: 10px;

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
