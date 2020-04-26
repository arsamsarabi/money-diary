<template>
  <div class="home-wrapper" v-if="!$auth.loading">
    <img class="logo" src="../assets/logo.svg" alt="Expense Tracker logo" />
    <h1>Expense Tracker</h1>
    <p>An open source, expense tracking and budgeting application</p>
    <ul>
      <li>Track your Expenses</li>
      <li>Review your Accounts</li>
      <li>Set Budgets</li>
      <li>Plan your Savings</li>
    </ul>
    <p>Give it a try, it's completely free to use!</p>
    <button @click="login">Get Started!</button>
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
