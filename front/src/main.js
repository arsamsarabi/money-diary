import Vue from 'vue'
import VModal from 'vue-js-modal'

import Icon from 'vue-awesome/components/Icon'
import 'vue-awesome/icons/calendar-day'
import 'vue-awesome/icons/calendar-times'
import 'vue-awesome/icons/caret-down'
import 'vue-awesome/icons/caret-up'
import 'vue-awesome/icons/cog'
import 'vue-awesome/icons/dollar-sign'
import 'vue-awesome/icons/home'
import 'vue-awesome/icons/pencil-alt'
import 'vue-awesome/icons/plus'
import 'vue-awesome/icons/redo-alt'
import 'vue-awesome/icons/trash-alt'
import 'vue-awesome/icons/tags'
import 'vue-awesome/icons/user'
import 'vue-awesome/icons/wallet'

import App from './App.vue'
import router from './router'
import store from './store'

Vue.config.productionTip = false

Vue.component('v-icon', Icon)

Vue.use(VModal, { componentName: 'v-modal' })

new Vue({
  router,
  store,
  render: h => h(App),
}).$mount('#app')
