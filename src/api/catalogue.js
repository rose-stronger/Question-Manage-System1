import request from '@/utils/request'
/**
 *
 * 目录列表
 */
export function directoryList(params) {
  return request({
    url: '/directorys',
    method: 'GET',
    params
  })
}
/**
 *
 * 获取目录名字列表(文档没有)
 */
export function directoryNameList(params) {
  return request({
    url: `/directorys/simple`,
    method: 'GET',
    params
  })
}
/**
 *
 * 目录状态
 */
export function catalogueList(id, state) {
  return request({
    url: `/directorys/${id}/${state}`,
    method: 'POST'
  })
}
/**
 *
 * 目录删除
 */
export function detelecatalogueList(id) {
  return request({
    url: `/directorys/${id}`,
    method: 'DELETE'
  })
}
/**
 *
 * 目录添加
 */
export function addcatalogueList(data) {
  return request({
    url: '/directorys',
    method: 'POST',
    data

    // answer: data.answer,
    // catalogID: data.catalogID,
    // enterpriseID: data.enterpriseID,
    // city: data.city,
    // difficulty: data.difficulty,
    // direction: data.direction,
    // enterpriseID: data.enterpriseID,
    // options: data.options,
    // province: data.province,
    // question: data.question,
    // questionType: data.questionType,
    // remarks: data.remarks,
    // subjectID: data.subjectID,
    // tags: data.tags,
    // videoURL: data.videoURL
  })
}
/**
 *
 * 目录详情
 */
export function detailsList(id) {
  return request({
    url: `/directorys/${id}`
  })
}
/**
 *
 * 目录修改
 */
export function modifyList(id, data) {
  return request({
    url: `/directorys/${id}`,
    method: 'PUT',
    data: {
      answer: data.answer,
      catalogID: data.catalogID,
      enterpriseID: data.enterpriseID,
      city: data.city,
      difficulty: data.difficulty,
      direction: data.direction,
      options: data.options,
      province: data.province,
      question: data.question,
      questionType: data.questionType,
      remarks: data.remarks,
      subjectID: data.subjectID,
      tags: data.tags,
      videoURL: data.videoURL
    }
  })
}
/**
 *
 * 目录修改lwx
 *
 */
export function modifyListLWX(id, data) {
  return request({
    url: `/directorys/${id}`,
    method: 'PUT',
    data
  })
}
