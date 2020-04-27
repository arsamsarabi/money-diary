<template>
  <div id="app">
    <div class="auth-loading" v-if="$auth.loading">
      <Loading />
    </div>
    <div class="auth-wrapper" v-else-if="$auth.isAuthenticated">
      <Navbar />
      <main class="content">
        <div class="inner-container">
          <router-view />
        </div>
      </main>
    </div>
    <Home v-else />
  </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'

import Navbar from '@/components/navbar/Navbar.vue'
import Loading from '@/components/Loading.vue'
import Home from '@/views/Home.vue'

export default {
  name: 'App',
  components: {
    Navbar,
    Loading,
    Home,
  },
  methods: {
    ...mapActions(['fetchMe', 'fetchExpensesByUserId', 'fetchAccountsByUserId', 'retrieveTokenFromAuthz']),
  },
  computed: {
    ...mapGetters(['getUser']),
  },
  created() {
    this.retrieveTokenFromAuthz().then(token => {
      this.fetchMe(token)
    })
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
}
</style>
