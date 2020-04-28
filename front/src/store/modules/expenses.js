import axios from 'axios'

import { defaultCategories } from '../../utils/categories'

const { VUE_APP_GQL_ENDPOINT } = process.env

const state = {
  expenses: [],
  categorised: defaultCategories,
}
const getters = {
  getExpenses: state => state.expenses,
  getCategorisedData: state => state.categorised,
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
    commit('setCategorised', data.data.getExpensesByUserId)
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
  setCategorised(state, expenses) {
    const newCategorisedData = state.categorised.map(category => {
      const categorised = {
        ...category,
        sum: parseFloat(
          expenses.reduce((accumulator, current) => {
            if (current.categories.includes(category.id)) {
              return accumulator + current.amount
            }
            return accumulator
          }, 0),
        ).toFixed(2),
      }
      return categorised
    })
    state.categorised = newCategorisedData.sort((a, b) => b.sum - a.sum)
  },
  addExpense(state, expense) {
    state.expenses = [...state.expenses, expense]
  },
}

export const Expenses = { state, getters, actions, mutations }
