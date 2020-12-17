// /v1_0/suggestion

// 用户相关请求模块
import request from '@/utils/request.js'

// 获取搜索框联想建议自动补全
export const getSearchSuggestions = q => {
  return request({
    method: 'GET',
    url: '/v1_0/suggestion',
    params: {
      q
    }
  })
}
