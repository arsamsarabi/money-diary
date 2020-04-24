import axios from 'axios'

const { VUE_APP_USER_ID, VUE_APP_GQL_ENDPOINT } = process.env

const state = {
  expenses: [],
}
const getters = {
  getExpenses: state => state.expenses,
  getTotalByCategory: state => {
    return category =>
      parseFloat(
        state.expenses.reduce((accumulator, current) => {
          if (current.categories.includes(category)) {
            return accumulator + current.amount
          }
          return accumulator
        }, 0),
      ).toFixed(2)
  },
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
            endDate
            accountId
            userId
          }
        }
      `,
    })
    commit('setExpenses', data.data.getExpensesByUserId)
  },
}
const mutations = {
  setExpenses(state, expenses) {
    state.expenses = expenses
  },
}

export default {
  state,
  getters,
  actions,
  mutations,
}
