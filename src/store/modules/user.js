import { getToken, setToken, removeToken } from '@/utils/auth'

const state = {
  token: getToken(),
  name: 'user',
  role: -1
}

const mutations = {
  SET_TOKEN: (state, token) => {
    state.token = token
    setToken(token)
    if (token === '') {
      removeToken()
      state.token = null
    }
  },
  SET_NAME: (state, name) => {
    state.name = name
  },
  SET_ROLES: (state, role) => {
    state.role = role
  }
}

const actions = {}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}
