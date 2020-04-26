<template>
  <div class="logo">
    <router-link to="/dashboard">
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
    color: var(--color-grey);
    font-family: var(--font-secondary);
    font-size: 1.5rem;
    text-align: center;
  }
}
</style>
