// 导入axios
import axios from 'axios'
import { Message } from 'element-ui'
// 导入token管理
import { removeItem, getItem } from './auth'
// 导入router
import router from '../router'

// 创建axios副本
const _axios = axios.create({
  baseURL: process.env.VUE_APP_URL
})
// 请求拦截器
_axios.interceptors.request.use(
  config => {
    config.headers.Authorization = `Bearer ${getItem()}`
    return config
  },
  error => {
    return Promise.reject(error)
  }
)
// 响应拦截器
_axios.interceptors.response.use(
  res => {
    return res.data
  },
  error => {
    console.dir(error)
    // 登录错误处理
    if (error.response.data && error.response.data.message) {
      Message.error(error.response.data.message)
    }
    // token 超时处理
    if (error.response.status === 401) {
      // 移除token
      removeItem()
      // 跳转回登录页
      router.push('/login')
    }
    return Promise.reject(error)
  }
)

// 暴露
export default _axios
