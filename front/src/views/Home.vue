<template>
  <div class="home-wrapper">
    App Info + Login/Sign up
    <div v-if="!$auth.loading">
      <button @click="login">Log in</button>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Home',
  methods: {
    login() {
      this.$auth.loginWithRedirect({ appState: { targetUrl: '/dashboard' } })
    },
  },
}
</script>

<style lang="scss" scoped>
.home-wrapper {
}
</style>
