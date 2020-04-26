<template>
  <div class="home-wrapper" v-if="!$auth.loading">
    <header>
      <Logo />
      <h1>Expense Tracker</h1>
      <a @click="login">Login/ Signup</a>
    </header>
    <main>
      <div class="hero">
        <img src="../assets/illustrations/chart.svg" alt="chart illustration" />
        <h2>Open source expense tracking and budgeting application</h2>
        <p>Give it a try, it's completely free to use!</p>
        <button @click="login">Get Started!</button>
      </div>
      <div class="box grey">
        <div class="left">
          <img src="../assets/illustrations/calculator.svg" alt="chart illustration" />
        </div>
        <div class="right">
          <h2>Track your Expenses</h2>
        </div>
      </div>
      <div class="box">
        <div class="left">
          <h2>Set Budgets</h2>
        </div>
        <div class="right">
          <img src="../assets/illustrations/wallet.svg" alt="chart illustration" />
        </div>
      </div>
      <div class="box grey">
        <div class="left">
          <img src="../assets/illustrations/savigs.svg" alt="chart illustration" />
        </div>
        <div class="right">
          <h2>Plan your Savings</h2>
        </div>
      </div>
      <div class="box get-started">
        <button @click="login">Get Started!</button>
      </div>
    </main>
  </div>
</template>

<script>
import Logo from '@/components/Logo'
export default {
  name: 'Home',
  components: {
    Logo,
  },
  methods: {
    login() {
      this.$auth.loginWithRedirect({ appState: { targetUrl: '/dashboard' } })
    },
  },
}
</script>

<style lang="scss" scoped>
@import '../scss/mixins.scss';

%btn-get-started {
  @include button(var(--color-primary));
  width: 480px;
  height: 80px;
  margin: 24px auto 0;
  border-radius: var(--border-r-m);
  font-size: 1.25rem;
}

.home-wrapper {
  width: 100vw;
  height: 100vh;
  overflow-y: auto;
  overflow-x: hidden;

  header {
    width: 100%;
    height: 80px;
    padding: 16px 32px;
    display: flex;
    justify-content: flex-start;
    align-items: center;
    svg {
      width: 56px;
      margin-right: 16px;
    }
    h1 {
      font-family: var(--font-secondary);
      font-size: 1.5rem;
      font-weight: bold;
      color: var(--color-primary);
    }
    a {
      margin-left: auto;
      transition: 0.2s all ease;
      &:hover {
        cursor: pointer;
        text-decoration: underline;
        text-decoration-color: var(--color-primary);
      }
    }
  }

  main {
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    align-items: flex-start;
  }

  .hero {
    width: 100%;
    text-align: center;
    margin-bottom: 40px;
    padding: 36px 0;
    img {
      width: 750px;
    }
    h2 {
      font-family: var(--font-secondary);
      font-size: 2rem;
      margin-top: 32px;
    }
    p {
      font-size: 1.24rem;
      margin-top: 32px;
    }
    button {
      @extend %btn-get-started;
    }
  }

  .box {
    width: 100%;
    display: flex;
    padding: 64px;

    &.grey {
      background-color: var(--color-blueGrey);
    }

    h2 {
      font-family: var(--font-secondary);
      font-size: 2rem;
    }

    & > div {
      flex: 1;
      display: flex;
      justify-content: center;
      align-items: center;
    }

    &.get-started {
      button {
        @extend %btn-get-started;
      }
    }
  }
}
</style>
