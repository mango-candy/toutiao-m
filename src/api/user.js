// 用户相关请求模块
import request from '@/utils/request.js'
// import store from '@/store'

export const login = data => {
  return request({
    method: 'POST',
    url: '/app/v1_0/authorizations',
    data: data
  })
}

// 发送验证码  注意：每分钟只能发送一次
export const sendSms = mobile => {
  return request({
    method: 'GET',
    url: `/app/v1_0/sms/codes/${mobile}`

  })
}

// 获取用户自己的信息
export const getUserInfo = () => {
  return request({
    method: 'GET',
    url: '/app/v1_0/user'
    // 发送请求头数据
    // headers: {
    //   // 注意：该接口需要授权才能访问
    //   Authorization: `Bearer ${store.state.user.token}`
    // }
  })
}
