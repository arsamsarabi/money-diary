<template>
  <div id="app">
    <div class="auth-loading" v-if="$auth.loading">
      <Loading class="loading" />
    </div>
    <div class="auth-wrapper" v-else-if="$auth.isAuthenticated">
      <Navbar />
      <main class="content">
        <div class="inner-container">
          <router-view />
        </div>
      </main>
    </div>
    <div v-else>
      <Home />
    </div>
  </div>
</template>

<script>
import { mapActions } from 'vuex'

import Navbar from '@/components/navbar/Navbar.vue'
import Loading from '@/components/Loading.vue'
import Logo from '@/components/Logo.vue'
import Home from '@/views/Home.vue'

export default {
  name: 'App',
  components: {
    Navbar,
    Logo,
    Loading,
    Home,
  },
  methods: {
    ...mapActions(['fetchUserById', 'fetchExpensesByUserId', 'fetchAccountsByUserId', 'retrieveTokenFromAuthz']),
  },
  created() {
    this.retrieveTokenFromAuthz()
    this.fetchUserById()
    this.fetchExpensesByUserId()
    this.fetchAccountsByUserId()
  },
}
</script>

<style lang="scss">
#app,
.auth-wrapper {
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
    min-height: 100%;
    display: flex;
  }
}
.auth-loading {
  width: 100vw;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;

  .loading {
    width: 100px;
    height: 100px;
  }
}
</style>
