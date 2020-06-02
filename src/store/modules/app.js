import Cookies from 'js-cookie'
import { sidebarRouters } from '@/router'

const state = {
  sidebarCollapse: Cookies.get('sidebarCollapse') === 'true', // 侧边栏折叠状态
  tagsList: [], // 标签列表
  routes: [] // 采用store管理routes，方便以后做动态路由权限管理
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
  },
  // 设置路由
  SET_ROUTES (state) {
    // state.routes = convertRoutes(sidebarRouters)
    state.routes = sidebarRouters
  }
}

// 转化路由
// function convertRoutes (routes) {
//   const result = []
//   routes.forEach(route => {
//     if (!route.meta.index) {
//       result.push({
//         index: route.path,
//         icon: route.meta.icon,
//         title: route.meta.title
//       })
//     } else {
//       if (route.meta.parentIcon) {
//         result.push({
//           index: route.meta.index,
//           icon: route.meta.parentIcon,
//           title: route.meta.parentTitle,
//           subs: [{
//             index: route.path,
//             title: route.meta.title
//           }]
//         })
//       } else {
//         result[result.length - 1].subs.push({
//           index: route.path,
//           title: route.meta.title
//         })
//       }
//     }
//   })
//   return result
// }

export default {
  namespaced: true,
  state,
  mutations
}
