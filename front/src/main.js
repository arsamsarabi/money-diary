import Vue from 'vue'
import VModal from 'vue-js-modal'
import Calendar from 'vue-simple-calendar'
import Icon from 'vue-awesome/components/Icon'
import './utils/icons'

import App from './App.vue'
import router from './router'
import store from './store'
import { Auth0Plugin } from './auth'

const { VUE_APP_AUTH0_DOMAIN, VUE_APP_AUTH0_CLIENT_ID, VUE_APP_AUTH0_AUDIENCE } = process.env

Vue.use(Auth0Plugin, {
  domain: VUE_APP_AUTH0_DOMAIN,
  clientId: VUE_APP_AUTH0_CLIENT_ID,
  audience: VUE_APP_AUTH0_AUDIENCE,
  onRedirectCallback: appState => {
    router.push(appState && appState.targetUrl ? appState.targetUrl : window.location.pathname)
  },
})

Vue.config.productionTip = false

Vue.component('v-icon', Icon)
Vue.component('v-calendar', Calendar)

Vue.use(VModal, { componentName: 'v-modal', dialog: true })

new Vue({
  router,
  store,
  render: h => h(App),
}).$mount('#app')
