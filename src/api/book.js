import request from '@/utils/request'

const rootUrl = '/api/books/'

export function fetchList () {
  return request({
    url: `${rootUrl}list`,
    method: 'get'
  })
}
