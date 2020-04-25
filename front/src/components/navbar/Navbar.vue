<template>
  <div class="navbar">
    <Logo />
    <ProfileCard />
    <RouterLinks />
    <!-- Check that the SDK client is not currently loading before accessing is methods -->
    <div v-if="!$auth.loading">
      <!-- show login when not authenticated -->
      <button v-if="!$auth.isAuthenticated" @click="login">Log in</button>
      <!-- show logout when authenticated -->
      <button v-if="$auth.isAuthenticated" @click="logout">Log out</button>
    </div>
  </div>
</template>

<script>
import RouterLinks from './RouterLinks'
import Logo from './Logo'
import ProfileCard from './ProfileCard'

export default {
  name: 'Navbar',
  components: {
    RouterLinks,
    Logo,
    ProfileCard,
  },
  methods: {
    login() {
      this.$auth.loginWithRedirect()
    },
    // Log the user out
    logout() {
      this.$auth.logout({
        returnTo: window.location.origin,
      })
    },
  },
}
</script>

<style lang="scss" scoped>
.navbar {
  width: var(--navbar-width-desktop);
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-start;
  padding: var(--padding-desktop);
}
</style>
