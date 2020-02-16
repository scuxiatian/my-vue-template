import moment from 'moment'

export function date (time) {
  return moment(time).format('YYYY-MM-DD')
}

export function money (num, type) {
  let tag = ''
  switch (type) {
    case 'CN':
      tag = '￥'
      break
    case 'US':
      tag = '$'
      break
    default:
      break
  }
  return `${tag}${num}`
}
