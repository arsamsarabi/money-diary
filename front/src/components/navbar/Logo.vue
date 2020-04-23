<template>
  <div class="logo">
    <router-link to="/">
      Expense Tracker
    </router-link>
  </div>
</template>

<script>
export default {
  name: 'Logo',
}
</script>

<style lang="scss" scoped>
.logo {
  a {
    text-decoration: none;
    color: var(--color-primary);
    font-family: var(--font-secondary);
    font-size: 1.5rem;
    text-align: center;
  }
}
</style>
