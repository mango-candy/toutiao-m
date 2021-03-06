// 文章请求模块
import request from '@/utils/request'

// 请求获取文章列表数据
export const getArticles = params => {
  return request({
    method: 'GET',
    url: '/app/v1_1/articles',
    // params选项用来配置Query参数
    params
  })
}

// 获取文章详情数据
export const getArticleById = articleId => {
  return request({
    method: 'GET',
    url: `/app/v1_0/articles/${articleId}`
  })
}

// 收藏文章详情数据
export const addCollect = target => {
  return request({
    method: 'POST',
    url: '/app/v1_0/article/collections',
    data: {
      target
    }
  })
}

// 取消收藏文章详情数据
export const deleteCollect = target => {
  return request({
    method: 'DELETE',
    url: `/app/v1_0/article/collections/${target}`
  })
}

// 点赞文章详情数据
export const addLike = target => {
  return request({
    method: 'POST',
    url: '/app/v1_0/article/likings',
    data: {
      target
    }
  })
}

// 取消点赞文章详情数据
export const deleteLike = target => {
  return request({
    method: 'DELETE',
    url: `/app/v1_0/article/likings/${target}`
  })
}
