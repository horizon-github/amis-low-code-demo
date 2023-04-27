import request from '@/utils/request'

export function login(data) {
  return request({
    url: '/system/login',
    method: 'post',
    data
  })
}

export function updatePwd(data) {
  return request({
    url: '/system/update-pwd',
    method: 'post',
    data
  })
}