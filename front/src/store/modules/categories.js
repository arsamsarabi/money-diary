import axios from 'axios'

const { VUE_APP_GQL_ENDPOINT } = process.env

const state = {
  categories: [],
}

const getters = {
  getCategories: state => state.categories,
}

const actions = {
  async getMyCategories({ commit, rootGetters }, userID) {
    const {
      data: {
        data: { getMyCategories },
        errors,
      },
    } = await axios.post(
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
    if (getMyCategories) commit('setCategories', getMyCategories)
  },
}

const mutations = {
  setCategories(state, categories) {
    state.categories = categories
  },
}

export const Categories = { state, getters, actions, mutations }
