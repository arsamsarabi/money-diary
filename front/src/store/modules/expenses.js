import axios from 'axios'

import { defaultCategories } from '../../utils/categories'

const { VUE_APP_USER_ID, VUE_APP_GQL_ENDPOINT } = process.env

const state = {
  expenses: [],
  categorised: defaultCategories,
}
const getters = {
  getExpenses: state => state.expenses,
  getCategorisedData: state => state.categorised,
}
const actions = {
  async fetchExpensesByUserId({ commit }) {
    const { data } = await axios.post(VUE_APP_GQL_ENDPOINT, {
      query: `
        query getExpensesByUserId {
          getExpensesByUserId(userId: "${VUE_APP_USER_ID}") {
            id
            title
            description
            amount
            startDate
            categories
            isRecurring
            endDate
            accountId
            userId
          }
        }
      `,
    })
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

export default {
  state,
  getters,
  actions,
  mutations,
}
