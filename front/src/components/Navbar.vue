<template>
  <div class="navbar">
    <div class="logo">
      <router-link to="/">
        <img alt="Vue logo" src="@/assets/logo.svg" />
        <span>Expense Tracker</span>
      </router-link>
    </div>
    <nav>
      <router-link to="/">Home</router-link>
      <router-link to="/about">About</router-link>
    </nav>
  </div>
</template>

<script>
export default {
  name: "Navbar"
};
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

.logo {
  margin-bottom: 16px;
  img {
    width: 50px;
    height: auto;
  }
}

nav {
  display: flex;
  flex-direction: column;
  a {
    &.router-link-exact-active {
      color: violet;
    }
  }
}
</style>
