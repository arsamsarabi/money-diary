<template>
  <nav>
    <router-link to="/">Home</router-link>
    <router-link to="/categories">Categories</router-link>
    <router-link to="/transactions">Transactions</router-link>
    <router-link to="/calendar">Calendar</router-link>
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
  margin-top: 48px;
  width: 100%;
  padding-left: 24px;
  a {
    text-decoration: none;
    font-size: 1.125rem;
    color: var(--color-grey-dark);
    transition: all 0.2s linear;
    position: relative;
    &.router-link-exact-active {
      color: var(--color-primary);
      font-weight: bold;
      &:before {
        width: 10px;
      }
    }
    &:not(:last-of-type) {
      margin-bottom: 24px;
    }

    &:before {
      content: '';
      position: absolute;
      width: 0;
      height: 100%;
      background-color: var(--color-primary);
      left: -20px;
      transition: 0.2s all ease-out;
      border-radius: 2px;
    }
  }
}
</style>
