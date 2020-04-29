import axios from 'axios'

const { VUE_APP_GQL_ENDPOINT } = process.env

const state = {
  expenses: [],
}
const getters = {
  getExpenses: state => state.expenses.filter(expense => !expense.recurring),
  getRecurring: state => state.expenses.filter(expense => expense.recurring),
}
const actions = {
  async fetchExpensesByUserId({ commit, rootGetters }, userID) {
    const { data } = await axios.post(
      VUE_APP_GQL_ENDPOINT,
      {
        query: `
        query getExpensesByUserId {
          getExpensesByUserId(userId: "${userID}") {
            id
            title
            description
            amount
            date
            recurring
            frequency
            endDate
            categories
            payee
            accountId
            userId
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
    commit('setExpenses', data.data.getExpensesByUserId)
  },
  async postExpense({ commit, rootGetters }, expense) {
    const query = `
      mutation addExpense($input: ExpenseInput) {
        addExpense(newExpense: $input) {
          id
          title
          description
          amount
          date
          recurring
          frequency
          endDate
          categories
          payee
          accountId
          userId
        }
      }
    `
    const { data, errors } = await axios.post(
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
    if (data.data.addExpense) commit('addExpense', data.data.addExpense)
  },
}
const mutations = {
  setExpenses(state, expenses) {
    state.expenses = expenses
  },
  addExpense(state, expense) {
    state.expenses = [...state.expenses, expense]
  },
}

export const Expenses = { state, getters, actions, mutations }
