import Vue from 'vue'
import Vuex from 'vuex'

import User from './modules/user'
import Expenses from './modules/expenses'

Vue.use(Vuex)

export default new Vuex.Store({
  modules: {
    User,
    Expenses,
  },
})
