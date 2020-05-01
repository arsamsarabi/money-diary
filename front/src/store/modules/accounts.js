import axios from 'axios'

const { VUE_APP_GQL_ENDPOINT } = process.env

const accountFields = `
  id
  name
  expenditureSumTotal
  expenditureSumMonth
  expenditureSum30Days
`

const state = {
  accounts: [],
}

const getters = {
  getAccounts: state => state.accounts,
  getAccountById: state => id => state.accounts.find(account => account.id === id),
}

const actions = {
  async fetchAccountsByUserId({ commit, rootGetters }, userID) {
    const {
      data: {
        data: { getAccountsByUserId },
        errors,
      },
    } = await axios.post(
      VUE_APP_GQL_ENDPOINT,
      {
        query: `
        query getAccountsByUserId {
          getAccountsByUserId(userId: "${userID}") {
            ${accountFields}
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
    if (getAccountsByUserId) commit('setAccounts', getAccountsByUserId)
  },
  async postAccount({ commit, rootGetters }, accountName) {
    const query = `
      mutation addAccount($input: AccountInput) {
        addAccount(newAccount: $input) {
          ${accountFields}
        }
      }
    `
    const {
      data: {
        data: { addAccount },
        errors,
      },
    } = await axios.post(
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
    if (addAccount) commit('addAccount', addAccount)
  },
  async patchAccount({ commit, rootGetters }, { id, name }) {
    const query = `
      mutation updateAccount($input: AccountInput) {
        updateAccount(accountToUpdate: $input) {
          ${accountFields}
        }
      }
    `
    const {
      data: {
        data: { updateAccount },
        errors,
      },
    } = await axios.post(
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

    if (errors) console.error(errors)
    if (updateAccount) commit('updateAccount', updateAccount)
  },
  async deleteAccount({ commit, rootGetters, dispatch }, { id }) {
    const query = `
      mutation deleteAccount($id: String) {
        deleteAccount(id: $id) {
          id
        }
      }
    `
    const {
      data: {
        data: { deleteAccount },
        errors,
      },
    } = await axios.post(
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
    if (deleteAccount) {
      dispatch('fetchExpensesByUserId', rootGetters.getUser.id)
      dispatch('getMyCategories', rootGetters.getUser.id)
      commit('deleteAccount', deleteAccount.id)
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
