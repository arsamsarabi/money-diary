import axios from 'axios'

const { VUE_APP_GQL_ENDPOINT } = process.env

const state = {
  accounts: [],
}

const getters = {
  getAccounts: state => state.accounts,
  getAccountById: state => id => state.accounts.find(account => account.id === id),
}

const actions = {
  async fetchAccountsByUserId({ commit, rootGetters }, userID) {
    const { data, errors } = await axios.post(
      VUE_APP_GQL_ENDPOINT,
      {
        query: `
        query getAccountsByUserId {
          getAccountsByUserId(userId: "${userID}") {
            id
            name
            expenditureSumTotal
            expenditureSumMonth
            expenditureSum30Days
          }
        }
      `,
      },
      {
        headers: {
          Authorization: `Bearer ${rootGetters.getToken}`,
        },
      },
    )
    if (errors) console.error(errors)
    if (data) commit('setAccounts', data.data.getAccountsByUserId)
  },
  async postAccount({ commit, rootGetters }, accountName) {
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
    const { data, errors } = await axios.post(
      VUE_APP_GQL_ENDPOINT,
      {
        query,
        variables: {
          input: {
            name: accountName,
            userId: rootGetters.getUser.id,
          },
        },
      },
      {
        headers: {
          Authorization: `Bearer ${rootGetters.getToken}`,
        },
      },
    )
    if (errors) console.error(errors)
    if (data.data.addAccount) commit('addAccount', data.data.addAccount)
  },
  async patchAccount({ commit, rootGetters }, { id, name }) {
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
    const { data } = await axios.post(
      VUE_APP_GQL_ENDPOINT,
      {
        query,
        variables: {
          input: {
            id: id,
            name: name,
            userId: rootGetters.getUser.id,
          },
        },
      },
      {
        headers: {
          Authorization: `Bearer ${rootGetters.getToken}`,
        },
      },
    )

    commit('updateAccount', data.data.updateAccount)
  },
  async deleteAccount({ commit, rootGetters, dispatch }, { id }) {
    const query = `
      mutation deleteAccount($id: String) {
        deleteAccount(id: $id) {
          id
        }
      }
    `
    const { data, errors } = await axios.post(
      VUE_APP_GQL_ENDPOINT,
      {
        query,
        variables: {
          id: id,
        },
      },
      {
        headers: {
          Authorization: `Bearer ${rootGetters.getToken}`,
        },
      },
    )

    if (errors) console.log(errors)
    if (data.data.deleteAccount) {
      dispatch('fetchExpensesByUserId', rootGetters.getUser.id)
      dispatch('getMyCategories', rootGetters.getUser.id)
      commit('deleteAccount', data.data.deleteAccount.id)
    }
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

export const Accounts = { state, getters, actions, mutations }
