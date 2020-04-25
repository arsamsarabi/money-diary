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
  async postAccount({ commit }, accountName) {
    const query = `
      mutation addAccount($input: AccountInput) {
        addAccount(newAccount: $input) {
          id
          name
          expenditureSumTotal
          expenditureSumMonth
          expenditureSum30Days
        }
      }
    `
    const { data } = await axios.post(VUE_APP_GQL_ENDPOINT, {
      query,
      variables: {
        input: {
          name: accountName,
          userId: VUE_APP_USER_ID,
        },
      },
    })
    commit('addAccount', data.data.addAccount)
  },
  async patchAccount({ commit }, { id, name }) {
    const query = `
      mutation updateAccount($input: AccountInput) {
        updateAccount(accountToUpdate: $input) {
          id
          name
          expenditureSumTotal
          expenditureSumMonth
          expenditureSum30Days
        }
      }
    `
    const { data } = await axios.post(VUE_APP_GQL_ENDPOINT, {
      query,
      variables: {
        input: {
          id: id,
          name: name,
        },
      },
    })

    commit('updateAccount', data.data.updateAccount)
  },
  async deleteAccount({ commit }, { id }) {
    const query = `
      mutation deleteAccount($id: String) {
        deleteAccount(id: $id) {
          id
        }
      }
    `
    const { data } = await axios.post(VUE_APP_GQL_ENDPOINT, {
      query,
      variables: {
        id: id,
      },
    })

    commit('deleteAccount', data.data.deleteAccount.id)
  },
}
const mutations = {
  setAccounts(state, accounts) {
    state.accounts = accounts
  },
  addAccount(state, account) {
    state.accounts = [...state.accounts, account]
  },
  updateAccount(state, account) {
    state.accounts = state.accounts.map(acc => (acc.id === account.id ? account : acc))
  },
  deleteAccount(state, id) {
    state.accounts = state.accounts.filter(acc => acc.id !== id)
  },
}

export default {
  state,
  getters,
  actions,
  mutations,
}
