import { getToken, setToken, removeToken } from '@/utils/auth'
import { login, logout, getInfo } from '@/api/user'

const state = {
  token: getToken(),
  name: 'user',
  role: -1
}

const mutations = {
  SET_TOKEN: (state, token) => {
    state.token = token
  },
  SET_NAME: (state, name) => {
    state.name = name
  },
  SET_ROLE: (state, role) => {
    state.role = role
  }
}

const actions = {
  // 用户登录
  login ({ commit }, userInfo) {
    const { username, password } = userInfo
    return new Promise((resolve, reject) => {
      login({ username: username.trim(), password }).then(response => {
        const data = response.data
        commit('SET_TOKEN', data.token)
        setToken(data.token)
        resolve()
      }).catch(error => {
        reject(error)
      })
    })
  },
  // 用户登出
  logout ({ commit }) {
    return new Promise((resolve, reject) => {
      logout().then(_ => {
        commit('SET_TOKEN', '')
        commit('SET_ROLE', -1)
        removeToken()
        resolve()
      }).catch(error => {
        reject(error)
      })
    })
  },
  // 获取用户个人信息
  getInfo ({ commit, state }) {
    return new Promise((resolve, reject) => {
      getInfo(state.token).then(response => {
        const data = response.data
        commit('SET_NAME', data.name)
        commit('SET_ROLE', data.role)
        resolve(data)
      }).catch(error => {
        reject(error)
      })
    })
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}
