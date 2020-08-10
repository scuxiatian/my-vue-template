const getters = {
  sidebarCollapse: state => state.app.sidebarCollapse,
  tagsList: state => state.app.tagsList,
  routes: state => state.app.routes,
  userInfo: state => state.user.userInfo,
  token: state => state.user.token
}

export default getters
