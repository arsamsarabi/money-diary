<template>
  <nav>
    <router-link to="/">Home</router-link>
    <router-link to="/categories">Categories</router-link>
    <router-link to="/transactions">Transactions</router-link>
    <router-link to="/calendar">Calendar</router-link>
    <router-link to="/settings">Settings</router-link>
  </nav>
</template>

<script>
export default {
  name: 'RouterLinks',
}
</script>

<style lang="scss" scoped>
nav {
  display: flex;
  flex-direction: column;
  margin-top: 80px;
  width: 100%;
  padding-left: 24px;
  a {
    text-decoration: none;
    font-size: 1.25rem;
    color: var(--color-grey-dark);
    transition: all 0.3s linear;

    &.router-link-exact-active {
      color: var(--color-primary);
      font-weight: bold;
    }
    &:not(:last-of-type) {
      margin-bottom: 24px;
    }
  }
}
</style>
