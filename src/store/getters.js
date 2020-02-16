const getters = {
  sidebarCollapse: state => state.app.sidebarCollapse,
  tagsList: state => state.app.tagsList,
  userName: state => state.user.name,
  token: state => state.user.token
}

export default getters
