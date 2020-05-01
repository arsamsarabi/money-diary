import axios from 'axios'

import { getInstance } from '@/auth'

const { VUE_APP_GQL_ENDPOINT } = process.env

const state = {
  user: null,
}

const getters = {
  getUser: state => state.user,
  getUserName: state => state.user?.name,
}

const actions = {
  fetchMe: async ({ dispatch, commit }, token) => {
    const instance = getInstance()
    const { given_name, nickname, email, sub } = instance.user
    const name = given_name ? given_name : nickname
    const query = `
      mutation me($input: UserInput) {
        me(user: $input) {
          id
          name
          email
          sub
        }
      }
    `

    const {
      data: {
        data: { me },
        errors,
      },
    } = await axios.post(
      VUE_APP_GQL_ENDPOINT,
      {
        query,
        variables: {
          input: {
            email,
            name,
            sub,
          },
        },
      },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      },
    )

    if (errors) console.error(errors)
    if (me) {
      dispatch('fetchAccountsByUserId', me.id)
      dispatch('fetchExpensesByUserId', me.id)
      dispatch('fetchMyIncomes', me.id)
      dispatch('getMyCategories', me.id)

      commit('setUser', { ...me, image: instance.user.picture })
    }
  },
  patchUser: async ({ commit, rootGetters, state }, username) => {
    const query = `
      mutation updateUser($input: UserInput) {
        updateUser(user: $input) {
          id
          name
          email
        }
      }
    `

    const {
      data: {
        data: { updateUser },
        errors,
      },
    } = await axios.post(
      VUE_APP_GQL_ENDPOINT,
      {
        query,
        variables: {
          input: {
            sub: state.user.sub,
            name: username,
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
    if (updateUser) commit('updateUser', { ...updateUser })
  },
}

const mutations = {
  setUser(state, user) {
    state.user = user
  },
  updateUser(state, user) {
    state.user = { ...state.user, ...user }
  },
}

export const User = { state, getters, actions, mutations }
