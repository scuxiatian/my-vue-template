const rootPath = '/api/users/'

export default [
  {
    url: `${rootPath}login`,
    type: 'post',
    response: config => {
      const { username } = config.body
      const token = `${username}-token`

      return {
        data: { token }
      }
    }
  },
  {
    url: `${rootPath}logout`,
    type: 'get',
    response: _ => {
      return {
        data: 'success'
      }
    }
  },
  {
    url: /\/info.*/,
    type: 'get',
    response: config => {
      const { token } = config.query
      const name = token.split('-')[0]
      return {
        data: {
          name,
          roles: name === 'admin' ? [0, 1] : [1]
        }
      }
    }
  }
]
