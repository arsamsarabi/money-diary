import axios from 'axios'

const { VUE_APP_GQL_ENDPOINT } = process.env

const accountFields = `
  id
  name
  expenditureSumTotal
  expenditureSumMonth
  expenditureSum30Days
  incomeSumTotal
  incomeSumMonth
  incomeSum30Days
`

const state = {
  accounts: [],
}

const getters = {
  getAccounts: ({ accounts }) => accounts,
  getAccountById: ({ accounts }) => id => accounts.find(account => account.id === id),
  getAccountsOverview: ({ accounts }) => {
    const result = {
      name: 'Accounts Overview',
      expenditureSumTotal: 0,
      expenditureSumMonth: 0,
      expenditureSum30Days: 0,
      incomeSumTotal: 0,
      incomeSumMonth: 0,
      incomeSum30Days: 0,
    }
    return accounts.reduce((acc, account) => {
      acc.expenditureSumTotal += account.expenditureSumTotal
      acc.expenditureSumMonth += account.expenditureSumMonth
      acc.expenditureSum30Days += account.expenditureSum30Days
      acc.incomeSumTotal += account.incomeSumTotal
      acc.incomeSumMonth += account.incomeSumMonth
      acc.incomeSum30Days += account.incomeSum30Days
      return acc
    }, result)
  },
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
