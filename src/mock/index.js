import Mock from 'mockjs'
import { param2Obj } from '@/utils'

// 自动引入模块
const modulesFiles = require.context('./modules', false, /\.js$/)
const modules = modulesFiles.keys().reduce((modules, modulePath) => {
  const moduleName = modulePath.replace(/^\.\/(.*)\.\w+$/, '$1')
  const value = modulesFiles(modulePath)
  modules[moduleName] = value.default
  return modules
}, {})

// 根据引入模块生成路由
Object.keys(modules).forEach(key => {
  const mockModule = modules[key]
  mockModule.forEach(item => {
    // 如 user.js中配置url为'/login' 则完整路由为 /api/user/login
    // Mock.mock(`/api/${key}${item.url}`, item.type, item.response)
    Mock.mock(item.url, item.type || 'get', XHR2ExpressReqWrap(item.response))
  })
})

function XHR2ExpressReqWrap (respond) {
  return function (options) {
    let result = null
    if (respond instanceof Function) {
      const { body, type, url } = options
      // https://expressjs.com/en/4x/api.html#req
      result = respond({
        method: type,
        body: JSON.parse(body),
        query: param2Obj(url)
      })
    } else {
      result = respond
    }
    return Mock.mock(result)
  }
}
