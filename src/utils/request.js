// 请求模块

import axios from 'axios'
import store from '@/store/index.js'

const request = axios.create({
  // 接口的基准路径
  baseURL: 'http://ttapi.research.itcast.cn/'
})

// 请求拦截器

request.interceptors.request.use(function (config) {
  // 请求发起会经过这里
  // config ：本次请求的配置对象
  const { user } = store.state
  // 如果user数据存在，且user数据内存在token
  if (user && user.token) {
    config.headers.Authorization = `Bearer ${user.token}`
  }

  // 注意：这里务必要返回config配置对象，否则请求就停在这里出不去了
  return config
}, function (error) {
  // 如果请求出错（请求未发出）
  return Promise.reject(error)
})

// 响应拦截器

export default request
