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
        }
      }
    `

    const { data } = await axios.post(
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

    dispatch('fetchAccountsByUserId', data.data.me.id)
    dispatch('fetchExpensesByUserId', data.data.me.id)
    dispatch('getMyCategories', data.data.me.id)

    commit('setUser', { ...data.data.me, image: instance.user.picture })
  },
}

const mutations = {
  setUser(state, user) {
    state.user = user
  },
}

export const User = { state, getters, actions, mutations }
