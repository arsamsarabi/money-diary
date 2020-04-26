import { to } from 'await-to-js'
import axios from 'axios'

import { getInstance } from '@/auth'

const { VUE_APP_GQL_ENDPOINT } = process.env

const state = {
  token: null,
  user: null,
}

const getters = {
  getToken: state => state.token,
  getUser: state => state.user,
  getUserName: state => state.user?.name,
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
  fetchMe: async ({ dispatch, commit }) => {
    const instance = getInstance()
    instance.$watch('loading', async loading => {
      if (loading === false && instance.isAuthenticated) {
        const query = `
          mutation me($input: UserInput) {
            me(user: $input) {
              id
              name
              email
            }
          }
        `

        const { given_name, nickname, email, sub } = instance.user

        const name = given_name ? given_name : nickname

        const { data } = await axios.post(VUE_APP_GQL_ENDPOINT, {
          query,
          variables: {
            input: {
              email,
              name,
              sub,
            },
          },
        })

        dispatch('fetchAccountsByUserId', data.data.me.id)
        dispatch('fetchExpensesByUserId', data.data.me.id)

        commit('setUser', { ...data.data.me, image: instance.user.picture })
      }
    })
  },
}

const mutations = {
  setToken(state, token) {
    state.token = token
  },
  setUser(state, user) {
    state.user = user
  },
}

export default {
  state,
  getters,
  actions,
  mutations,
}
