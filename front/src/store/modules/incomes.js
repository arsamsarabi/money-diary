import axios from 'axios'

const { VUE_APP_GQL_ENDPOINT } = process.env

const state = {
  incomes: [],
}
const getters = {
  getIncomes: state => state.incomes,
  getOneOffIncomes: state => state.incomes.filter(expense => !expense.recurring),
  getRecurringIncomes: state => state.incomes.filter(expense => expense.recurring),
}
const actions = {
  async fetchMyIncomes({ commit, rootGetters }) {
    const { data } = await axios.post(
      VUE_APP_GQL_ENDPOINT,
      {
        query: `
        query getMyIncomes {
          getMyIncomes(userId: "${rootGetters.getUser.id}") {
            id
            title
            description
            amount
            date
            recurring
            frequency
            daysPerWeek
            payer
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
    commit('setIncomes', data.data.getMyIncomes)
  },
  async postIncome({ commit, rootGetters }, income) {
    const query = `
      mutation addIncome($input: IncomeInput) {
        addIncome(newIncome: $input) {
          id
          title
          description
          amount
          date
          recurring
          frequency
          daysPerWeek
          payer
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
            ...income,
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
    if (data.data.addIncome) {
      commit('addIncome', data.data.addIncome)
    }
  },
  async patchIncome({ commit, rootGetters }, income) {
    const query = `
      mutation updateIncome($input: IncomeInput) {
        updateIncome(incomeToUpdate: $input) {
          id
          title
          description
          amount
          date
          recurring
          frequency
          daysPerWeek
          payer
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
            ...income,
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
    if (data.data.updateIncome) {
      commit('updateIncome', data.data.updateIncome)
    }
  },
  async deleteIncome({ commit, rootGetters }, { id }) {
    const query = `
      mutation deleteIncome($id: String, $userId: String) {
        deleteIncome(id: $id, userId: $userId) {
          id
        }
      }
    `
    const { data, errors } = await axios.post(
      VUE_APP_GQL_ENDPOINT,
      {
        query,
        variables: {
          id: id,
          userId: rootGetters.getUser.id,
        },
      },
      {
        headers: {
          Authorization: `Bearer ${rootGetters.getToken}`,
        },
      },
    )
    if (errors) console.error(errors)
    if (data.data.deleteIncome) {
      commit('deleteIncome', data.data.deleteIncome.id)
    }
  },
}
const mutations = {
  setIncomes(state, incomes) {
    state.incomes = incomes
  },
  addIncome(state, income) {
    state.incomes = [...state.incomes, income]
  },
  updateIncome(state, income) {
    state.incomes = state.incomes.map(inc => (inc.id === income.id ? income : inc))
  },
  deleteIncome(state, id) {
    state.incomes = state.incomes.filter(inc => inc.id !== id)
  },
}

export const Incomes = { state, getters, actions, mutations }
