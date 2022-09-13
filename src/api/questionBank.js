import request from '@/utils/request'
/**
 *
 * 基础题库列表
 */
export function questionBankList(params) {
  return request({
    url: '/questions',
    method: 'GET',
    params
  })
}
/**
 *
 *基础题库删除

 */
export function deleteBankList(id) {
  return request({
    url: `/questions/${id}`,
    method: 'DELETE'
  })
}
/**
 *
 *组题列表

 */
export function findRandoms(params) {
  return request({
    url: '/questions/randoms/',
    method: 'GET',
    params
  })
}
/**
 *
 *基础题库详情

 */
export function getBasicRandomsDetail(id, isNext) {
  return request({
    url: `/questions/${id}`,
    method: 'GET',
    params: {
      isNext
    }
  })
}
// export function getBasicRandomsDetail(id) {
//   return request({
//     url: `/questions/${id}`,
//     method: 'GET'
//   })
// }
/**
 *
 *基础题库修改

 */
export function postBasicRandomsEdit(id, data) {
  return request({
    url: `/questions/${id}`,
    method: 'PUT',
    data
  })
}
/**
 *
 *基础题库添加

 */
export function postBasicRandomsAdd(data) {
  return request({
    url: `/questions`,
    method: 'POST',
    data
  })
}
/**
 *
 *精选题库上下架

 */
export function postAddSelectedQuestion(id, publishState) {
  return request({
    url: `/questions/choice/${id}/${publishState}`,
    method: 'POST'
  })
}
/**
 *
 *删除精选

 */
export function patchSelectedQuestion(id) {
  return request({
    url: `/questions/${id}`,
    method: 'DELETE'
  })
}
/**
 *
 *删除精选

 */
export function patchTrueSelectedQuestion(id, choiceState) {
  return request({
    url: `/questions/choice/${id}/${choiceState}`,
    method: 'PATCH'
  })
}
/**
 *
 *精选题库列表

 */
export function getSelectedQuestionList(params) {
  return request({
    url: `/questions/choice`,
    method: 'get',
    params
  })
}
/**
 *
 *审核意见

 */
export function getQuesCheckState(id) {
  return request({
    url: `/questions/${id}/auditOpinions`,
    method: 'get'
  })
}
/**
 *
 *审核意见修改

 */
export function PostQuesCheckSuggest(id, data) {
  return request({
    url: `questions/check/${id}`,
    method: 'POST',
    data
  })
}
