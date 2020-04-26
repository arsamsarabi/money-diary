import { getInstance } from '@/auth'

const state = {
  token: null,
}

const getters = {
  token: state => state.token,
}

const actions = {
  retrieveTokenFromAuthz({ commit }) {
    return new Promise((resolve, reject) => {
      const instance = getInstance()
      instance.$watch('loading', loading => {
        if (loading === false && instance.isAuthenticated) {
          instance
            .getTokenSilently()
            .then(authToken => {
              commit('setToken', authToken)
              resolve(authToken)
            })
            .catch(error => {
              reject(error)
            })
        }
      })
    })
  },
}

const mutations = {
  setToken(state, token) {
    state.token = token
  },
}

export default {
  state,
  getters,
  actions,
  mutations,
}
