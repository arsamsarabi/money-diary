<template>
  <div class="card">
    <img :src="userImage" />
    <h1>Hello, Arsam!</h1>
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
  height: 300px;
  background-color: #fff;
  margin-top: 40px;
  box-shadow: 1px 1px 5px 0px rgba(0, 0, 0, 0.125);

  img {
    width: 75px;
    height: 75px;
    overflow: hidden;
    border: 2px solid var(--color-grey-light);
    border-radius: 50%;
  }
}
</style>
