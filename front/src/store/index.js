import Vue from 'vue'
import Vuex from 'vuex'

import User from './modules/user'
import Accounts from './modules/accounts'
import Expenses from './modules/expenses'

Vue.use(Vuex)

export default new Vuex.Store({
  modules: {
    User,
    Accounts,
    Expenses,
  },
})
