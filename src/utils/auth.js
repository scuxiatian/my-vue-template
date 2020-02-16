import Cookies from 'js-cookie'

const TokenKey = 'Token'

export function getToken () {
  return Cookies.get(TokenKey)
}

export function setToken (token) {
  return Cookies.set(TokenKey, token)
}

export function removeToken () {
  console.log('123')
  return Cookies.remove(TokenKey)
}
