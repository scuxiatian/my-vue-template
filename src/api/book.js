import request from '@/utils/request'

const rootUrl = '/api/book/'

export function fetchList () {
  return request({
    url: `${rootUrl}list`,
    method: 'get'
  })
}
