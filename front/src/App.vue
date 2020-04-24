<template>
  <div id="app">
    <Navbar />
    <main class="content">
      <router-view />
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
    ...mapActions(['fetchUserById', 'fetchExpensesByUserId']),
  },
  created() {
    this.fetchUserById()
    this.fetchExpensesByUserId()
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
}
</style>
