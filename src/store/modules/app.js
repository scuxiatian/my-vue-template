import Cookies from 'js-cookie'

const state = {
  sidebarCollapse: Cookies.get('sidebarCollapse') === 'true', // 侧边栏折叠状态
  tagsList: [] // 标签列表
}

const mutations = {
  // 切换侧边栏折叠
  TOGGLE_SIDEBAR: state => {
    const sidebarCollapseStatus = !state.sidebarCollapse
    state.sidebarCollapse = sidebarCollapseStatus
    Cookies.set('sidebarCollapse', sidebarCollapseStatus)
  },
  // 更新标签列表
  UPDATE_TAGS: (state, payload) => {
    const route = payload.route
    const isExist = state.tagsList.some(item => {
      return item.path === route.fullPath
    })
    if (!isExist) {
      if (state.tagsList.length >= 8) {
        state.tagsList.shift()
      }
      state.tagsList.push({
        title: route.meta.title,
        path: route.fullPath,
        name: route.matched[1].components.default.name
      })
    }
  },
  // 关闭标签
  REMOVE_TAGS: (state, payload) => {
    const { mode, index } = payload
    const tag = state.tagsList[index]
    switch (mode) {
      case 0: // 关闭单个标签
        state.tagsList.splice(index, 1)
        break
      case 1: // 关闭其它标签
        state.tagsList = [tag]
        break
      case 2: // 关闭所有标签
        state.tagsList = []
        break
    }
  }
}

export default {
  namespaced: true,
  state,
  mutations
}
