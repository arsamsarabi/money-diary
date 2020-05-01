import axios from 'axios'

const { VUE_APP_GQL_ENDPOINT } = process.env

const incomeFields = `
  id
  title
  description
  amount
  date
  recurring
  frequency
  daysPerWeek
  payer
  account {
    id
    name
    description
  }
  user {
    id
    sub
    name
    email
  }
`

const state = {
  incomes: [],
}

const getters = {
  getIncomes: state => state.incomes,
  getOneOffIncomes: state => state.incomes.filter(income => !income.recurring),
  getRecurringIncomes: state => state.incomes.filter(income => income.recurring),
}

const actions = {
  async fetchMyIncomes({ commit, rootGetters }, userId) {
    const {
      data: {
        data: { getMyIncomes },
        errors,
      },
    } = await axios.post(
      VUE_APP_GQL_ENDPOINT,
      {
        query: `
        query getMyIncomes {
          getMyIncomes(user: "${userId}") {
            ${incomeFields}
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
    if (getMyIncomes) commit('setIncomes', getMyIncomes)
  },
  async postIncome({ commit, rootGetters }, income) {
    const query = `
      mutation addIncome($input: IncomeInput) {
        addIncome(newIncome: $input) {
          ${incomeFields}
        }
      }
    `
    const {
      data: {
        data: { addIncome },
        errors,
      },
    } = await axios.post(
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
    if (addIncome) commit('addIncome', addIncome)
  },
  async patchIncome({ commit, rootGetters }, income) {
    const query = `
      mutation updateIncome($input: IncomeInput) {
        updateIncome(incomeToUpdate: $input) {
          ${incomeFields}
        }
      }
    `
    const {
      data: {
        data: { updateIncome },
        errors,
      },
    } = await axios.post(
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
    if (updateIncome) commit('updateIncome', updateIncome)
  },
  async deleteIncome({ commit, rootGetters }, { id }) {
    const query = `
      mutation deleteIncome($id: String, $userId: String) {
        deleteIncome(id: $id, userId: $userId) {
          id
        }
      }
    `
    const {
      data: {
        data: { deleteIncome },
        errors,
      },
    } = await axios.post(
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
    if (deleteIncome) commit('deleteIncome', deleteIncome.id)
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
