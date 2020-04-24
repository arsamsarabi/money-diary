<template>
  <div id="app">
    <Navbar />
    <main class="content">
      <div class="inner-container">
        <router-view />
      </div>
    </main>
  </div>
</template>

<script>
import { mapActions } from 'vuex'

import Navbar from '@/components/navbar/Navbar.vue'

export default {
  name: 'App',
  components: {
    Navbar,
  },
  methods: {
    ...mapActions(['fetchUserById', 'fetchExpensesByUserId', 'fetchAccountsByUserId']),
  },
  created() {
    this.fetchUserById()
    this.fetchExpensesByUserId()
    this.fetchAccountsByUserId()
  },
}
</script>

<style lang="scss">
#app {
  width: 100vw;
  height: 100vh;
  overflow: hidden;
  display: flex;
}
main.content {
  width: calc(100vw - var(--navbar-width-desktop));
  padding: var(--padding-desktop);
  overflow-y: auto;
  .inner-container {
    max-width: 904px;
  }
}
</style>
