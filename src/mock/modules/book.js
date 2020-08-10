import Mock from 'mockjs'

const rootPath = '/api/books/'
const list = []
const count = 10

for (let i = 0; i < count; ++i) {
  list.push(Mock.mock({
    id: '@increment',
    publishTime: +Mock.Random.date('T'),
    title: '@sentence(1, 5)',
    author: '@name',
    price: '@float(40, 120, 0, 2)',
    'priceType|1': ['CN', 'US'],
    pageCount: '@integer(200, 1000)'
  }))
}

export default [
  {
    url: `${rootPath}list`,
    response: _ => {
      return {
        code: 0,
        data: list
      }
    }
  }
]
