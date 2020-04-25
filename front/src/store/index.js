import Vue from 'vue'
import Vuex from 'vuex'

import User from './modules/user'
import Accounts from './modules/accounts'
import Expenses from './modules/expenses'
import Recurrings from './modules/recurrings'

Vue.use(Vuex)

export default new Vuex.Store({
  modules: {
    User,
    Accounts,
    Expenses,
    Recurrings,
  },
})
