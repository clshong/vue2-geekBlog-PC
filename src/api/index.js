import request from '@/utils/request.js'

// 登录请求
export function getLoginPost (data) {
  return request({
    url: '/v1_0/authorizations',
    method: 'post',
    data: data
  })
}

// 获取用户信息
export function getUserInfo () {
  return request({
    url: '/v1_0/user/profile',
    method: 'get'
  })
}

// 获取频道列表
export function getChannelList () {
  return request({
    url: '/v1_0/channels'
  })
}

// 获取文章详情
export function getArticle (params) {
  return request({
    url: '/v1_0/mp/articles',
    params
  })
}
