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
            categories
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
}

export const Expenses = { state, getters, actions, mutations }
