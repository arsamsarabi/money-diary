import axios from 'axios'

const { VUE_APP_GQL_ENDPOINT } = process.env

const state = {
  recurrings: [],
}
const getters = {
  getRecurrings: state => state.recurrings,
}
const actions = {
  async fetchRecurringsByUserId({ commit }, userID) {
    const { data } = await axios.post(VUE_APP_GQL_ENDPOINT, {
      query: `
        query getRecurringsByUserId {
          getRecurringsByUserId(userId: "${userID}") {
            id
            title
            description
            amount
            startDate
            endDate
            categories
            accountId
            userId
          }
        }
      `,
    })
    commit('setRecurrings', data.data.getRecurringsByUserId)
  },
}
const mutations = {
  setRecurrings(state, expenses) {
    state.expenses = expenses
  },
}

export default {
  state,
  getters,
  actions,
  mutations,
}
