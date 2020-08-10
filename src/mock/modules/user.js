const rootPath = '/api/users/'

export default [
  {
    url: `${rootPath}login`,
    type: 'post',
    response: config => {
      const { username } = config.body
      const token = `${username}-token`

      return {
        code: 0,
        data: {
          token
        }
      }
    }
  },
  {
    url: `${rootPath}logout`,
    type: 'get',
    response: _ => {
      return {
        code: 0,
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
        code: 0,
        data: {
          name,
          roles: name === 'admin' ? [0, 1] : [1]
        }
      }
    }
  }
]
