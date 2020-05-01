import axios from 'axios'

const { VUE_APP_GQL_ENDPOINT } = process.env

const expenseFields = `
  id
  title
  description
  amount
  date
  recurring
  frequency
  endDate
  categories {
    id
    label
    icon
    color
  }
  payee
  accountId
  userId
`

const state = {
  expenses: [],
}

const getters = {
  getExpenses: state => state.expenses.filter(expense => !expense.recurring),
  getRecurring: state => state.expenses.filter(expense => expense.recurring),
}

const actions = {
  async fetchExpensesByUserId({ commit, rootGetters }, userID) {
    const {
      data: {
        data: { getExpensesByUserId },
        errors,
      },
    } = await axios.post(
      VUE_APP_GQL_ENDPOINT,
      {
        query: `
        query getExpensesByUserId {
          getExpensesByUserId(userId: "${userID}") {
            ${expenseFields}
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
    if (getExpensesByUserId) commit('setExpenses', getExpensesByUserId)
  },
  async postExpense({ commit, rootGetters, dispatch }, expense) {
    const query = `
      mutation addExpense($input: ExpenseInput) {
        addExpense(newExpense: $input) {
          ${expenseFields}
        }
      }
    `
    const {
      data: {
        data: { addExpense },
        errors,
      },
    } = await axios.post(
      VUE_APP_GQL_ENDPOINT,
      {
        query,
        variables: {
          input: {
            ...expense,
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
    if (addExpense) {
      dispatch('getMyCategories', rootGetters.getUser.id)
      commit('addExpense', addExpense)
    }
  },
  async patchExpense({ commit, rootGetters, dispatch }, expense) {
    const query = `
      mutation updateExpense($input: ExpenseInput) {
        updateExpense(expenseToUpdate: $input) {
          ${expenseFields}
        }
      }
    `
    const {
      data: {
        data: { updateExpense },
        errors,
      },
    } = await axios.post(
      VUE_APP_GQL_ENDPOINT,
      {
        query,
        variables: {
          input: {
            ...expense,
            categories: expense.categories?.map(cat => cat.id) || [],
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
    if (updateExpense) {
      dispatch('getMyCategories', rootGetters.getUser.id)
      commit('updateExpense', updateExpense)
    }
  },
  async deleteExpense({ commit, rootGetters, dispatch }, { id }) {
    const query = `
      mutation deleteExpense($id: String) {
        deleteExpense(id: $id) {
          id
        }
      }
    `
    const {
      data: {
        data: { deleteExpense },
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
    if (errors) console.error(errors)
    if (deleteExpense) {
      dispatch('getMyCategories', rootGetters.getUser.id)
      commit('deleteExpense', deleteExpense.id)
    }
  },
}

const mutations = {
  setExpenses(state, expenses) {
    state.expenses = expenses
  },
  addExpense(state, expense) {
    state.expenses = [...state.expenses, expense]
  },
  updateExpense(state, expense) {
    state.expenses = state.expenses.map(exp => (exp.id === expense.id ? expense : exp))
  },
  deleteExpense(state, id) {
    state.expenses = state.expenses.filter(exp => exp.id !== id)
  },
}

export const Expenses = { state, getters, actions, mutations }
