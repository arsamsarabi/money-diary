<template>
  <div class="navbar">
    <Logo />
    <ProfileCard />
    <RouterLinks />
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
}
</script>

<style lang="scss" scoped>
.navbar {
  width: 288px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-start;
  padding: var(--padding-desktop);
}
</style>
