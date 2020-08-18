import Mock from 'mockjs'
const options = []

for (let i = 0; i < 100; i++) {
  options.push(Mock.mock({
    value: '@guid',
    label: '@word'
  }))
}

export default [
  {
    url: /\/api\/options/,
    response: config => {
      const { count } = config.query
      return {
        code: 0,
        data: options.slice(0, count)
      }
    }
  }
]
