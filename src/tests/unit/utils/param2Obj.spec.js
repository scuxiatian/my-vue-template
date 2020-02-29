import { param2Obj } from '@/utils/index.js'

describe('Utils:param2Obj', () => {
  const url = 'http://localhost:8080/api/test?id=0&page=1'
  it('param test', () => {
    const obj = param2Obj(url)
    expect(obj.id).toBe('0')
    expect(obj.page).toBe('1')
  })
})
