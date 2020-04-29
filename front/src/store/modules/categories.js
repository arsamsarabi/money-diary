import axios from 'axios'

const { VUE_APP_GQL_ENDPOINT } = process.env

const state = {
  categories: [],
}

const getters = {
  getCategories: state => state.categories,
  getOneCategory: (state, { key, value }) => state.categories.find(cat => cat[key] === value),
}

const actions = {
  async getMyCategories({ commit, rootGetters }, userID) {
    const { data, errors } = await axios.post(
      VUE_APP_GQL_ENDPOINT,
      {
        query: `
        query getMyCategories {
          getMyCategories(userId: "${userID}") {
            id
            label
            icon
            color
            userId
            expensesSum
            recurringSum
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
    if (data) commit('setCategories', data.data.getMyCategories)
  },
}
const mutations = {
  setCategories(state, categories) {
    state.categories = categories
  },
}

export const Categories = { state, getters, actions, mutations }
