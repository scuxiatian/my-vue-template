import request from '@/utils/request'

const rootUrl = '/api/users/'

export function login (data) {
  return request({
    url: `${rootUrl}login`,
    method: 'post',
    data
  })
}

export function getInfo (token) {
  return request({
    url: `${rootUrl}info`,
    method: 'get',
    params: { token }
  })
}

export function logout () {
  return request({
    url: `${rootUrl}logout`,
    method: 'get'
  })
}
