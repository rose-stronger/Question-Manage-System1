import request from '@/utils/request'

/**
 * 标签列表
 */
export function getTagsList(params) {
  return request({
    url: '/tags',
    method: 'GET',
    params
  })
}
/**
 * 获取标签名字列表（文档没有）
 */
export function getTagsNameList(params) {
  return request({
    url: '/tags/simple',
    method: 'GET',
    params
  })
}
/**
 * 标签状态
 */
export function stateList(id, state) {
  return request({
    url: `/tags/${id}/${state}`,
    method: 'POST'
  })
}
/**
 * 标签详情
 */
export function echoList(id) {
  return request({
    url: `/tags/${id}`,
    method: 'GET'
  })
}
/**
 * 标签修改
 */
export function modifyList(id, data) {
  return request({
    url: `/tags/${id}`,
    method: 'PUT',
    data
  })
}
/**
 * 添加
 */
export function addedTagsList(data) {
  return request({
    url: '/tags',
    method: 'POST',
    data
  })
}
/**
 * 删除
 */
export function deleteTagsList(id) {
  return request({
    url: `/tags/${id}`,
    method: 'DELETE'
  })
}
