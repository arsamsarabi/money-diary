<template>
  <nav>
    <router-link to="/dashboard"> <v-icon name="table" />Dashboard</router-link>

    <router-link to="/accounts"> <v-icon name="file-invoice-dollar" />Accounts</router-link>
    <router-link to="/incomes"> <v-icon name="hand-holding-usd" />Incomes</router-link>
    <router-link to="/expenses"> <v-icon name="regular/credit-card" />Expenses</router-link>

    <router-link class="disabled" to="/categories"> <v-icon name="tags" />Categories</router-link>
    <router-link class="disabled" to="/wallet"> <v-icon name="wallet" />Wallet</router-link>
    <router-link class="disabled" to="/savings"> <v-icon name="piggy-bank" />Savings</router-link>
    <router-link class="disabled" to="/budget"> <v-icon name="percentage" />Budget</router-link>
    <router-link class="disabled" to="/calendar"> <v-icon name="calendar-alt" />Calendar</router-link>
    <router-link class="disabled" to="/charts"> <v-icon name="chart-bar" />Charts</router-link>
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
    color: var(--color-grey);
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
      margin-bottom: 16px;
    }
    &.disabled {
      pointer-events: none;
      color: var(--color-grey-light);
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

    & > svg {
      margin-right: 8px;
    }
  }
}
</style>
