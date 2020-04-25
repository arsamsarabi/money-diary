import axios from 'axios'

const { VUE_APP_USER_ID, VUE_APP_GQL_ENDPOINT } = process.env

const state = {
  accounts: [],
}
const getters = {
  getAccounts: state => state.accounts,
  getAccountById: state => id => state.accounts.find(account => account.id === id),
}
const actions = {
  async fetchAccountsByUserId({ commit }) {
    const { data } = await axios.post(VUE_APP_GQL_ENDPOINT, {
      query: `
        query getAccountsByUserId {
          getAccountsByUserId(userId: "${VUE_APP_USER_ID}") {
            id
            name
            expenditureSumTotal
            expenditureSumMonth
            expenditureSum30Days
          }
        }
      `,
    })
    commit('setAccounts', data.data.getAccountsByUserId)
  },
}
const mutations = {
  setAccounts(state, accounts) {
    state.accounts = accounts
  },
}

export default {
  state,
  getters,
  actions,
  mutations,
}
