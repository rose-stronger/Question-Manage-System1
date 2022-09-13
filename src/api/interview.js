import request from '@/utils/request'

/**
 * 面试技巧文章列表
 */
export function getArticleList(params) {
  return request({
    url:'/articles',
    method: 'GET',
    params
  })
}
/**
 * 删除
 */
export function deleteArticleList(id) {
  return request({
    url:`/articles/${id}`,
    method: 'DELETE',

  })
}
/**
 * 文章添加
 */
export function addedArticleList(data) {
  return request({
    url:'/articles',
    method: 'POST',
   data
  })
}
/**
 * 文章详情
 */
export function detailsArticleList(id) {
  return request({
    url:`/articles/${id}`,
   method:'GET'
  })
}
/**
 * 文章编辑
 */
export function editArticleList(id,data) {
  return request({
    url:`/articles/${id}`,
    method: 'PUT',
    data
  })
}
/**
 * 文章状态
 */
export function stateArticleList(id,state) {
  return request({
    url:`/articles/${id}/${state}`,
    method: 'POST',

  })
}


