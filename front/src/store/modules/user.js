import axios from 'axios'

const { VUE_APP_USER_ID, VUE_APP_GQL_ENDPOINT } = process.env

const state = {
  id: '',
  name: '',
}

const getters = {
  getUser: state => state,
  getUserId: state => state.id,
  getUserName: state => state.name,
}

const actions = {
  async fetchUserById({ commit }) {
    const { data } = await axios.post(VUE_APP_GQL_ENDPOINT, {
      query: `
        query getUserById {
          me(userId: "${VUE_APP_USER_ID}") {
            id
            name
          }
        }
      `,
    })
    commit('setUserDetails', { id: data.data.me.id, name: data.data.me.name })
  },
}

const mutations = {
  setUserDetails: (state, { id, name }) => {
    state.id = id
    state.name = name
  },
}

export default {
  state,
  getters,
  actions,
  mutations,
}
