import { to } from 'await-to-js'

import { getInstance } from '@/auth'

const state = {
  token: null,
}

const getters = {
  getToken: state => state.token,
}

const actions = {
  retrieveTokenFromAuthz({ commit }) {
    return new Promise((resolve, reject) => {
      const instance = getInstance()
      instance.$watch('loading', async loading => {
        if (loading === false && instance.isAuthenticated) {
          const [err, authToken] = await to(instance.getTokenSilently())

          if (err) reject(err)

          if (authToken) {
            commit('setToken', authToken)
            resolve(authToken)
          }
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

export const Auth = { state, getters, actions, mutations }
