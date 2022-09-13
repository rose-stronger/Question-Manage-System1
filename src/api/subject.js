import request from '@/utils/request'
/**
 * 学科列表
 */
export function subjectsList(params) {
  return request({
    url: '/subjects',
    method: 'GET',
    params
  })
}
/**
 * 学科简单列表
 */
export function subjectsSimpleList(params) {
  return request({
    url: '/subjects/simple',
    method: 'GET',
    params
  })
}
/**
 * 学科删除
 */
export function deletesubjectsList(id) {
  return request({
    url: `/subjects/${id}`,
    method: 'DELETE'
  })
}
/**
 * 学科添加
 */
export function addSubjectsList(data) {
  return request({
    url: '/subjects',
    method: 'POST',
    data
  })
}
/**
 * 学科详情
 */
export function courseDetails(id) {
  return request({
    url: `/subjects/${id}`,
    method: 'GET'
  })
}
/**
 * 学科修改
 */
export function modifyCourseDetails(id, data) {
  return request({
    url: `/subjects/${id}`,
    method: 'PUT',
    data: {
      id: data.id,
      isFrontDisplay: data.isFrontDisplay,
      subjectName: data.subjectName
    }
  })
}
/**
 * 学科简单列表
 */
export function simpleList(data) {
  return request({
    url: '/subjects/simple',
    method: 'GET',
    data
  })
}
