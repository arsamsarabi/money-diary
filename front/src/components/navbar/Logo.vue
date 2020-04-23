<template>
  <div class="logo">
    <router-link to="/">
      <img alt="Vue logo" src="@/assets/logo.svg" />
      <span>Expense Tracker</span>
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
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;

    span {
      color: var(--color-primary);
      font-family: var(--font-secondary);
      font-size: 1.5rem;
      text-align: center;
      margin-top: 16px;
    }
  }
  img {
    width: 100px;
    height: auto;
  }
}
</style>
